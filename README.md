# Full Stack Open

Exercise submissions for the University of Helsinki [Full Stack Open](https://fullstackopen.com/) course.

## Deployed apps

| App | URL |
| --- | --- |
| Phonebook (parts 2 and 3) | https://puhelinluettelo-backend-nltk.onrender.com |
| Bloglist (parts 4, 5, 7 and 11) | https://blogilista-vgy5.onrender.com |

## Structure

| Directory | Content |
| --- | --- |
| [osa0](./osa0) | Part 0 – Fundamentals of Web apps (exercises 0.4–0.6) |
| [osa1/kurssitiedot](./osa1/kurssitiedot) | Part 1 – Course information (1.1–1.5) |
| [osa1/unicafe](./osa1/unicafe) | Part 1 – Unicafe (1.6–1.11) |
| [osa1/anekdootit](./osa1/anekdootit) | Part 1 – Anecdotes (1.12–1.14) |
| [osa2/kurssitiedot](./osa2/kurssitiedot) | Part 2 – Course information (2.1–2.5) |
| [osa2/puhelinluettelo](./osa2/puhelinluettelo) | Part 2 – Phonebook (2.6–2.17) |
| [osa2/maiden_tiedot](./osa2/maiden_tiedot) | Part 2 – Countries (2.18–2.20) |
| [osa3/puhelinluettelo-backend](./osa3/puhelinluettelo-backend) | Part 3 – Phonebook backend (3.1–3.22) |
| [osa4/blogilista](./osa4/blogilista) | Part 4 – Bloglist backend with tests and JWT auth (4.1–4.23) |
| [osa5/blogilista-frontend](./osa5/blogilista-frontend) | Part 5 – Bloglist frontend + component tests (5.1–5.16) |
| [osa5/blogilista-e2e](./osa5/blogilista-e2e) | Part 5 – Playwright end-to-end tests (5.17–5.23) |
| [osa6/unicafe-redux](./osa6/unicafe-redux) | Part 6 – unicafe with a Redux reducer (6.1–6.2) |
| [osa6/redux-anecdotes](./osa6/redux-anecdotes) | Part 6 – Anecdotes with Redux Toolkit (6.3–6.19) |
| [osa6/query-anecdotes](./osa6/query-anecdotes) | Part 6 – Anecdotes with React Query + context (6.20–6.24) |
| [osa7/routed-anecdotes](./osa7/routed-anecdotes) | Part 7 – Anecdotes with React Router and `useField` (7.1–7.3) |
| [osa7/country-hook](./osa7/country-hook) | Part 7 – `useCountry` hook (7.4) |
| [osa7/ultimate-hooks](./osa7/ultimate-hooks) | Part 7 – `useResource` hook (7.5) |
| [osa7/bloglist-frontend](./osa7/bloglist-frontend) | Part 7 – Bloglist with Redux, router, comments and Bootstrap (7.9–7.21) |
| [osa8/library-backend](./osa8/library-backend) | Part 8 – GraphQL library backend (Apollo Server, auth, subscriptions) |
| [osa8/library-frontend](./osa8/library-frontend) | Part 8 – Library frontend with Apollo Client (8.8–8.26) |
| [osa9/laskurit](./osa9/laskurit) | Part 9 – BMI/exercise calculators + typed Express endpoints (9.1–9.7) |
| [osa9/flight-diary](./osa9/flight-diary) | Part 9 – Flight diary backend with hand-written parsers (9.8–9.13) |
| [osa9/kurssitiedot-ts](./osa9/kurssitiedot-ts) | Part 9 – Course info in React + TypeScript (9.14–9.15) |
| [osa9/patientor-backend](./osa9/patientor-backend) | Part 9 – Patientor backend, zod validation (9.9–9.27) |
| [osa9/patientor-frontend](./osa9/patientor-frontend) | Part 9 – Patientor frontend (9.16–9.30) |
| [osa10/rate-repository-app](./osa10/rate-repository-app) | Part 10 – React Native rate repository app (10.1–10.27) |
| [osa11](./osa11) | Part 11 – CI/CD pipeline for the bloglist app (11.1–11.21) |
| [osa12/todo-app](./osa12/todo-app) | Part 12 – Containerised todo app with nginx, MongoDB and Redis (12.1–12.22) |
| [osa13/blogilista-psql](./osa13/blogilista-psql) | Part 13 – Blog list on PostgreSQL with Sequelize (13.1–13.24) |

The applications are Vite + React apps. Run one with:

```bash
cd osa1/<app>
npm install
npm run dev
```

### Phonebook

The phonebook talks to the part 3 backend through the relative path `/api/persons`.
Start the backend in one terminal and the frontend in another (the dev server
proxies `/api` to port 3001):

```bash
cd osa3/puhelinluettelo-backend && npm run dev
cd osa2/puhelinluettelo && npm run dev
```

### Phonebook backend (part 3)

An Express + Mongoose REST API. Copy `.env.example` to `.env` with a MongoDB
connection string, then:

```bash
cd osa3/puhelinluettelo-backend
npm install
npm run dev          # API on http://localhost:3001
npm run build:ui     # build the part 2 frontend into ./dist, served by the backend
```

The deployed version is at https://puhelinluettelo-backend-nltk.onrender.com — it
serves the built part 2 frontend from `/` and the API under `/api/persons`.

### Bloglist backend (part 4)

Express + Mongoose API with token authentication and a `node:test` + supertest
suite. Copy `.env.example` to `.env` (needs `MONGODB_URI`, `TEST_MONGODB_URI`
and `SECRET`), then:

```bash
cd osa4/blogilista
npm install
npm run dev
npm test
```

### Bloglist frontend and e2e tests (part 5)

The frontend proxies `/api` to the part 4 backend on port 3003:

```bash
cd osa5/blogilista-frontend
npm install
npm run dev          # http://localhost:5173
npm test             # Vitest + React Testing Library
```

The Playwright suite expects the backend running with `NODE_ENV=test` (so that
`POST /api/testing/reset` is available) and the frontend on port 5173:

```bash
cd osa4/blogilista && npm run test:e2e-server   # backend in test mode
cd osa5/blogilista-frontend && npm run dev
cd osa5/blogilista-e2e && npm install && npx playwright install chromium && npm test
```

### Anecdotes (part 6)

Both anecdote apps expect json-server on port 3001 (`npm run server`) and the
Vite dev server proxies `/anecdotes` to it:

```bash
cd osa6/redux-anecdotes   # or osa6/query-anecdotes
npm install
npm run server            # json-server on http://localhost:3001
npm run dev
```

### Bloglist extension (part 7)

Same part 4 backend (now with `POST /api/blogs/:id/comments`) on port 3003:

```bash
cd osa4/blogilista && npm run dev
cd osa7/bloglist-frontend && npm install && npm run dev
npm test    # Vitest component tests
```

`osa7/ultimate-hooks` needs json-server on port 3005 (`npm run server`).

### Library (part 8, GraphQL)

Copy `osa8/library-backend/.env.example` to `.env` (`MONGODB_URI`, `JWT_SECRET`), then:

```bash
cd osa8/library-backend && npm install && npm run seed && npm run dev   # http://localhost:4000
cd osa8/library-frontend && npm install && npm run dev
```

Log in with any user created via the `createUser` mutation; the password is
`secret` for everyone (as in the course material).

### TypeScript apps (part 9)

Every part 9 app is typed with `strict` on; `npm run tsc` / `npm run build`
type-checks and `npm run lint` runs typed ESLint rules.

```bash
cd osa9/laskurit && npm install
npm run calculateBmi 180 74
npm run calculateExercises 2 1 0 2 4.5 0 3 1
npm run dev                     # http://localhost:3002 (/hello, /bmi, /exercises)

cd osa9/flight-diary && npm install && npm run dev        # port 3000
cd osa9/kurssitiedot-ts && npm install && npm run dev

cd osa9/patientor-backend && npm install && npm run dev   # port 3001
cd osa9/patientor-frontend && npm install && npm run dev
```

### Rate repository app (part 10)

Expo app. It talks to the course's `rate-repository-api` server, so start that
first and point `APOLLO_URI` at it (see `.env.example`):

```bash
cd osa10/rate-repository-app
npm install
cp .env.example .env
npm start          # then open in Expo Go, an emulator or the browser
npm test
```

### Countries

Weather data needs an [OpenWeather](https://openweathermap.org/api) API key in
`osa2/maiden_tiedot/.env` (see `.env.example`):

```bash
VITE_WEATHER_API_KEY=<your key>
```

