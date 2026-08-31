# Part 11 - CI/CD

The written exercises (11.1-11.4) are answered here; the pipeline itself lives in
[`.github/workflows/`](../.github/workflows) and runs against the bloglist app
from parts 4, 5 and 7 (exercises 11.20-11.21).

## 11.1 Warming up

*Languages: Python, Java, Ruby, JavaScript.*

For a Python project the CI job would at least run a linter (`ruff` or
`flake8`), a formatter check (`black --check`), a type checker (`mypy`) and the
test suite (`pytest`). Nothing here is Python specific - every language needs
lint, format, type and test steps; only the tools change (`eslint`/`prettier`/
`tsc`/`jest` in JavaScript, `checkstyle`/`spotless`/`javac`/`junit` in Java).

Alternatives to Jenkins and GitHub Actions: GitLab CI, CircleCI, Travis CI,
Azure Pipelines, Drone. The main question when choosing is self-hosted vs.
cloud: self-hosting gives control over hardware, secrets and licensing costs but
someone has to maintain the machines; a cloud service removes maintenance but
you pay per minute and give the provider access to the source code.

For a small team of six with a strong CI/CD interest and a need to run the app
locally, a cloud service such as GitHub Actions is the reasonable choice: no
server maintenance, the free tier is enough for that team size, and the
configuration lives in the repository.

## 11.2 The example project

The pipeline is defined in YAML files under `.github/workflows`. GitHub Actions
picks up every workflow file in that directory automatically.

## 11.3 Linting and 11.4 Testing

The `pipeline.yml` job `lint_and_test` installs dependencies with `npm ci`, then runs `npm run lint`,
`npm test` and `npm run build` for the backend and the frontend, and finally the
Playwright end-to-end suite against a backend started with `NODE_ENV=test`.
MongoDB is provided as a service container so the backend tests have a database.

## Deployment and versioning (11.10-11.16)

`deploy` runs only for pushes to `main`, only after the tests pass, and it is
skipped when any commit message in the push contains `#skip`:

```yaml
if: >-
  github.event_name == 'push' &&
  !contains(join(github.event.commits.*.message, ' '), '#skip')
```

Deployment itself is a call to a Render deploy hook stored in the
`RENDER_DEPLOY_HOOK` secret. After a successful deploy `tag_release` bumps the
patch version and pushes a new `vX.Y.Z` tag.

## Notifications and health check (11.17-11.19)

`notify` posts to Discord through `DISCORD_WEBHOOK` on both success and failure,
and `health_check.yml` pings `/health` daily (and on demand) so a deployment
that starts failing later is noticed.

## Required repository secrets

| Secret | Used for |
| --- | --- |
| `RENDER_DEPLOY_HOOK` | triggering the deployment |
| `DISCORD_WEBHOOK` | build and health check notifications |
