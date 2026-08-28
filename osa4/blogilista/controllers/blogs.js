const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0,
    user: user._id,
  })

  const saved = await blog.save()
  user.blogs = user.blogs.concat(saved._id)
  await user.save()

  response.status(201).json(await saved.populate('user', { username: 1, name: 1 }))
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(204).end()
  }

  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: 'only the creator can delete a blog' })
  }

  await blog.deleteOne()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', { username: 1, name: 1 })

  if (!updated) {
    return response.status(404).end()
  }

  response.json(updated)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body

  if (!comment) {
    return response.status(400).json({ error: 'comment is missing' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.comments = blog.comments.concat(comment)
  const saved = await blog.save()

  response.status(201).json(await saved.populate('user', { username: 1, name: 1 }))
})

module.exports = blogsRouter
