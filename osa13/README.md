# Part 13 - Relational databases

`blogilista-psql/` is the blog list backend rewritten on PostgreSQL with
Sequelize. The schema is managed with umzug migrations only - nothing calls
`sync()`, so the migration files are the single source of truth.

## Running it

```bash
docker run -d --name pg13 -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=blogs -p 5433:5432 postgres:16

cd osa13/blogilista-psql
npm install
cp .env.example .env
npm start
```

Migrations run at startup, so the tables are created on the first boot.

## Endpoints

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/api/blogs` | `?search=` matches title or author (case insensitive), ordered by likes |
| POST | `/api/blogs` | requires a token |
| PUT | `/api/blogs/:id` | updates likes |
| DELETE | `/api/blogs/:id` | only the creator |
| GET | `/api/authors` | blog count and total likes grouped by author |
| GET | `/api/users` | users with their blogs |
| GET | `/api/users/:id` | reading list, `?read=true|false` filters it |
| POST | `/api/users` | |
| PUT | `/api/users/:username` | change username |
| PUT | `/api/users/:username/disabled` | admins only |
| POST | `/api/login` | stores a session row |
| DELETE | `/api/logout` | invalidates the session |
| POST | `/api/readinglists` | add a blog to a reading list |
| PUT | `/api/readinglists/:id` | mark read, owner only |

## Notes

- Tokens are only accepted while a matching row exists in `sessions`, so
  logging out or disabling an account invalidates tokens immediately even
  though the JWT itself is still within its hour.
- The user model has a default scope that hides `password_hash`; login reads it
  through the `withHash` scope.
- `Sequelize` validation errors are turned into 400 responses in a single error
  handler instead of being caught in each route.
