# Containerised bloglist

Development and production container environments for the bloglist application.
The application code lives in [osa4/blogilista](../osa4/blogilista) (backend) and
[osa5/blogilista-frontend](../osa5/blogilista-frontend) (frontend), so the
Dockerfiles are next to the code they build and the Compose files here point at
those directories.

| File | Purpose |
| --- | --- |
| [docker-compose.dev.yml](./docker-compose.dev.yml) | Development environment: Vite dev server, backend with `--watch`, MongoDB and Nginx |
| [docker-compose.yml](./docker-compose.yml) | Production environment: built frontend served by Nginx, backend, MongoDB |
| [nginx.dev.conf](./nginx.dev.conf) | Reverse proxy for development |
| [nginx.conf](./nginx.conf) | Reverse proxy for production |

Both environments are reached at http://localhost:8080 and only Nginx publishes
a port to the host.

```bash
docker compose -f docker-compose.dev.yml up
docker compose up
```
