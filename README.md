# AI CRM Dashboard

A full-stack CRM dashboard built with a Vite React frontend and an Express/MongoDB backend. The app includes dashboard analytics, leads, contacts, notes, tasks, authentication screens, and AI-oriented CRM workflows.

## Live Deployment

- Frontend: https://aicrmdashboard.vercel.app
- Backend API: https://aicrmdashboard3.onrender.com
- Backend health check: https://aicrmdashboard3.onrender.com/api/health

The backend is deployed on Render's free instance tier, so the first request after inactivity can take a little longer while the service wakes up.

## Project Structure

```text
AICRMDASHBOARD/
  frontend/   React + Vite client
  backend/    Express API, MongoDB, JWT auth
```

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Recharts, Lucide React
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- Tooling: ESLint, npm

## Getting Started

Install dependencies for both apps:

```bash
npm run install:all
```

Create the backend environment file:

```bash
cp backend/.env.example backend/.env
```

Then update `backend/.env` with your real MongoDB URI and JWT secret.

Run the backend:

```bash
npm run dev:backend
```

Run the frontend in another terminal:

```bash
npm run dev:frontend
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:8000/api/health`

## Environment Variables

Backend:

```env
PORT=8000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-long-random-secret
```

Frontend:

```env
VITE_API_URL=http://localhost:8000/api
```

The frontend currently runs with local mock CRM data. To connect it to the live backend API, enable the Axios client in `frontend/src/lib/api.js` and switch the service methods in `frontend/src/lib/services.js` from mock responses to the existing API calls.

## Available Scripts

From the project root:

```bash
npm run install:all
npm run dev:frontend
npm run dev:backend
npm run build
npm run lint
npm run check:backend
```

From `frontend/`:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

From `backend/`:

```bash
npm run dev
npm start
```

## Production Build

Build the frontend:

```bash
npm run build
```

Check backend syntax:

```bash
npm run check:backend
```

## Deployment

Frontend deployment settings:

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://aicrmdashboard3.onrender.com/api`

Backend deployment settings:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables: `PORT`, `MONGO_URI`, `JWT_SECRET`

See [DEPLOYMENT.md](DEPLOYMENT.md) for the full checklist.

## GitHub Notes

Do not commit real environment files such as `backend/.env`. Commit `.env.example` files only.

If you want GitHub to include both the frontend and backend, initialize Git at the project root and push from there.
