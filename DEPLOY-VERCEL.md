# Deploy frontend on Vercel

## Option A — Dashboard (recommended)

1. Push the repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → Import the repository.
3. Framework: **Vite** (auto-detected from `vercel.json`).
4. **Environment variable** (Production + Preview):

   | Name | Value |
   |------|--------|
   | `VITE_CONTACT_API_URL` | `https://velttora-contact-api.fly.dev/api/contact` |

5. Deploy.

## Option B — CLI

```bash
vercel login
cd /path/to/Velttora
vercel link
vercel env add VITE_CONTACT_API_URL production
# paste: https://velttora-contact-api.fly.dev/api/contact
pnpm deploy:web
```

## After deploy

Add your Vercel URL to Fly CORS (replace with your real URL):

```bash
fly secrets set -a velttora-contact-api \
  "CORS_ORIGIN=https://velttora.com,https://www.velttora.com,https://YOUR-PROJECT.vercel.app"
fly deploy server
```

## Checks

- Site loads on `https://*.vercel.app`
- Contact form submits without CORS errors (browser Network tab → `velttora-contact-api.fly.dev`)
- API health: `curl https://velttora-contact-api.fly.dev/api/health`
