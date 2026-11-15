# Pipe Ref – corrections API and admin

Cloudflare Worker + D1. Deployed from the `admin` branch by Cloudflare Workers Builds.

- `api.piperef.site` – public: `POST /api/corrections`, `GET /api/log`, `GET /api/versions`, `GET /api/corrections/:ref`
- `admin.piperef.site` – admin page and `/api/admin/*`, behind Cloudflare Access (the Worker also checks the Access token)

Deploy command (Workers Builds): `npx wrangler d1 migrations apply piperef --remote && npx wrangler deploy`

Local: `npm install`, `npm run migrate:local`, put `DEV_ADMIN=yes` in `.dev.vars`, `npx wrangler dev`, open http://localhost:8787/admin/
