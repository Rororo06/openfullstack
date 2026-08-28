const _ = require('lodash')

const dummy = () => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((best, blog) =>
    blog.likes > best.likes ? blog : best
  )

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return null
  }

  const counts = _.countBy(blogs, 'author')
  const [author, count] = _.maxBy(Object.entries(counts), ([, n]) => n)

  return { author, blogs: count }
}

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return null
  }

  const byAuthor = _.map(_.groupBy(blogs, 'author'), (authorBlogs, author) => ({
    author,
    likes: totalLikes(authorBlogs),
  }))

  return _.maxBy(byAuthor, 'likes')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
