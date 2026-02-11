## Blog Monorepo

This repository is a small blog application structured as a monorepo with separate frontend and backend apps plus shared TypeScript types.

- **Frontend**: `apps/frontend` (React + Vite)
- **Backend**: `apps/backend` (Express + MongoDB + Mongoose)
- **Shared types**: `packages/types`

### Prerequisites

- Node.js 18+ (recommended 20+)
- npm or pnpm
- Local MongoDB instance for development (default: `mongodb://localhost:27017/blog`)

### Install

```bash
npm install
```

This uses npm workspaces from the root `package.json` and installs dependencies for all apps/packages.

### Scripts (run from repo root)

- **Development**

```bash
npm run dev
```

Runs all `dev` scripts in parallel (frontend Vite dev server, backend Express dev server) via Turborepo.

- **Build**

```bash
npm run build
```

Builds all apps and packages.

- **Lint**

```bash
npm run lint
```

Runs ESLint across the monorepo.

- **Type-check**

```bash
npm run type-check
```

Runs `tsc --noEmit` where configured.

- **Tests (backend)**

```bash
npm run test
```

Currently configured to run tests for the backend app via Jest and ts-jest.

### Backend environment

Backend configuration is loaded from `.env` in `apps/backend`.

Copy the example file:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Then adjust values as needed:

- `PORT` – HTTP port for the Express server (default `3001`)
- `DATABASE_URL` – MongoDB connection string
