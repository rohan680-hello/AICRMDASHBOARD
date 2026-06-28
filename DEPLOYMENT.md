# Deployment Notes

This project is split into:

- `frontend/` - Vite React app
- `backend/` - Express API with MongoDB and JWT auth

## Current readiness

- Frontend production build passes with `npm.cmd run build`.
- Frontend lint passes with warnings only.
- Backend syntax check passes with `node --check server.js`.
- The frontend currently uses mock data from `frontend/src/lib/mockData.js`.

## Before pushing to GitHub

1. Make sure `backend/.env` is not committed.
2. Commit `backend/.env.example` instead, then set real values on the deployment host.
3. Push from the project root if you want GitHub to include both `frontend/` and `backend/`.

Recommended root-level Git commands:

```bash
git init
git add .
git commit -m "Prepare full-stack CRM dashboard for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Backend deploy settings

Use these settings for a Node/Express host:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `PORT`
  - `MONGO_URI`
  - `JWT_SECRET`

After deploy, test:

```bash
GET https://your-backend-url/api/health
```

## Frontend deploy settings

Use these settings for a Vite host:

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables:
  - `VITE_API_URL=https://your-backend-url/api`

If you want the deployed frontend to use the real backend instead of mock data, enable the Axios client in `frontend/src/lib/api.js` and swap the mock service methods in `frontend/src/lib/services.js` to the commented real API calls.

## Verification commands

Run these before deploying:

```bash
npm run build --prefix frontend
npm run lint --prefix frontend
node --check backend/server.js
```
