const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const DataLoader = require('dataloader')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const pubsub = new PubSub()

const BOOK_ADDED = 'BOOK_ADDED'

// Counting books per author in one query keeps Author.bookCount off the n+1 path.
const createBookCountLoader = () =>
  new DataLoader(async authorIds => {
    const counts = await Book.aggregate([
      { $match: { author: { $in: authorIds } } },
      { $group: { _id: '$author', count: { $sum: 1 } } },
    ])

    const byAuthor = new Map(counts.map(({ _id, count }) => [_id.toString(), count]))
    return authorIds.map(id => byAuthor.get(id.toString()) ?? 0)
  })

const badUserInput = (message, argumentName) =>
  new GraphQLError(message, {
    extensions: { code: 'BAD_USER_INPUT', invalidArgs: argumentName },
  })

const requireUser = currentUser => {
  if (!currentUser) {
    throw new GraphQLError('not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    })
  }

  return currentUser
}

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        filter.author = author ? author._id : null
      }

      if (args.genre) {
        filter.genres = args.genre
      }

      return await Book.find(filter).populate('author')
    },
    allAuthors: async () => Author.find({}),
    allGenres: async () => {
      const genres = await Book.distinct('genres')
      return genres.sort()
    },
    me: (root, args, { currentUser }) => currentUser,
  },
  Author: {
    bookCount: (root, args, { bookCountLoader }) => bookCountLoader.load(root._id),
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      requireUser(currentUser)

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })

        try {
          await author.save()
        } catch (error) {
          throw badUserInput(error.message, 'author')
        }
      }

      const book = new Book({ ...args, author: author._id })

      try {
        await book.save()
      } catch (error) {
        throw badUserInput(error.message, 'title')
      }

      const added = await book.populate('author')
      pubsub.publish(BOOK_ADDED, { bookAdded: added })

      return added
    },
    editAuthor: async (root, args, { currentUser }) => {
      requireUser(currentUser)

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        return await author.save()
      } catch (error) {
        throw badUserInput(error.message, 'setBornTo')
      }
    },
    createUser: async (root, args) => {
      const user = new User(args)

      try {
        return await user.save()
      } catch (error) {
        throw badUserInput(error.message, 'username')
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      // The course app uses a single hard-coded password for every user.
      if (!user || args.password !== 'secret') {
        throw badUserInput('wrong credentials', 'username')
      }

      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      return { value: token }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator(BOOK_ADDED),
    },
  },
}

module.exports = { resolvers, createBookCountLoader }
