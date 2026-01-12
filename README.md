# Madison.dev

Full-stack TypeScript app with an Express API, Vite-powered React client, and a Postgres database managed by Drizzle ORM.

## Prerequisites

- Node.js 22 (per `package.json` engines)
- A Postgres database (local or hosted)

## Setup

1. Clone the repo:
   ```bash
   git clone <your-repo-url>
   cd madison.dev
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (example using a `.env` file or your shell):
   ```bash
   export DATABASE_URL="postgres://USER:PASSWORD@HOST:PORT/DB_NAME"
   # Optional overrides
   export WORDPRESS_API_URL="https://your-wordpress-site"
   export NINJA_FORM_ID="1"
   ```

4. (Optional) Push database schema:
   ```bash
   npm run db:push
   ```

## Development

Start the dev server (API + client with Vite):
```bash
npm run dev
```

The app listens on `PORT` (default `8080`).

## Production build

Build client + server:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

## Type checking

```bash
npm run check
```
