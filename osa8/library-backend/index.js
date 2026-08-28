require('dotenv').config()

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express5')
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const cors = require('cors')
const express = require('express')
const { useServer } = require('graphql-ws/use/ws')
const http = require('http')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { WebSocketServer } = require('ws')

const User = require('./models/user')
const typeDefs = require('./schema')
const { resolvers, createBookCountLoader } = require('./resolvers')

const start = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('connected to MongoDB')

  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({ server: httpServer, path: '/' })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization ?? ''
        const context = { bookCountLoader: createBookCountLoader() }

        if (auth.toLowerCase().startsWith('bearer ')) {
          const decoded = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          context.currentUser = await User.findById(decoded.id)
        }

        return context
      },
    })
  )

  const PORT = process.env.PORT || 4000
  httpServer.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`)
  })
}

start()
