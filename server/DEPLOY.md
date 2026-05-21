# Deploy contact API on Fly.io

## Prerequisites

- [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/): `brew install flyctl`
- Log in: `fly auth login`

## First-time setup

From the repo root:

```bash
cd server
fly launch --no-deploy
```

If the app name `velttora-contact-api` is taken, edit `fly.toml` (`app = 'your-unique-name'`) and run `fly apps create your-unique-name` or accept a new name when prompted.

Secrets are in `server/.fly-secrets.env` (gitignored). From repo root:

```bash
# Optional: refresh from server/.env
pnpm secrets:sync

# Push all secrets to Fly
pnpm secrets:api
```

Deploy:

```bash
fly deploy
```

Check health:

```bash
fly open /api/health
# or
curl https://velttora-contact-api.fly.dev/api/health
```

## Updates

```bash
cd server && fly deploy
```

Or from repo root: `pnpm deploy:api`

## Frontend (production)

Point the Vite build at your Fly URL:

```env
VITE_CONTACT_API_URL=https://velttora-contact-api.fly.dev/api/contact
```

Rebuild and deploy the static site (Vercel, Netlify, Fly static, etc.).

## Useful commands

| Command | Description |
|---------|-------------|
| `fly logs` | Live logs |
| `fly status` | Machine status |
| `fly secrets list` | Configured secrets |
| `fly ssh console` | Shell into the VM |
