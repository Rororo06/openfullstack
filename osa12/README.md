# Part 12 — Containers

`todo-app/` is the todo application from the part 12 material: an Express
backend with MongoDB and Redis, a React frontend and nginx in front of both.

## Development environment

```bash
cd osa12/todo-app
docker compose -f docker-compose.dev.yml up --build
```

Everything is behind nginx on <http://localhost:8080>: `/` goes to the Vite dev
server and `/api/` to the backend. The source directories are bind mounted, so
edits are picked up without rebuilding (`watch: { usePolling: true }` is needed
for the file events to reach Vite from a mount).

## Production-ish environment

```bash
cd osa12/todo-app
docker compose up --build
```

The frontend image is a multi-stage build: `npm run build` in a Node image, then
only the `dist/` output is copied into an nginx image. The backend image
installs with `npm ci --omit=dev` and runs as the non-root `node` user.

MongoDB is initialised by `mongo/mongo-init.js`, which creates the application
user and seeds two todos. Redis stores the `added_todos` counter that
`GET /api/statistics` returns; without `REDIS_URL` the counter helpers are
no-ops, so the backend also runs outside compose.

## Useful one-liners from the material

```bash
# 12.1 script inside a container
docker run -it --rm -v "$(pwd):/usr/src/app" -w /usr/src/app node:22 node index.js

# 12.5-12.6 the backend and mongo without compose
docker run -d -p 27017:27017 mongo:7
docker build -t todo-backend ./todo-app/todo-backend
docker run -p 3000:3000 -e MONGO_URL=mongodb://host.docker.internal:27017/the_database todo-backend

# 12.12 redis cli against the compose stack
docker compose exec redis redis-cli
```
