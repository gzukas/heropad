# Getting Started

To begin using Heropad, ensure you have the following dependencies installed and configured:

- [Node.js](https://nodejs.org/) (version 20.x)
- [pnpm](https://pnpm.io/) (version 9.x)
- [Docker](https://docs.docker.com/get-docker/) (required to run the local database; [Podman Desktop](https://podman-desktop.io/) can be used)

Follow these steps to set up and run Heropad locally:

1. Install dependencies at the root of the repository.

   ```sh
   pnpm install
   ```

2. Copy both `.env.example` files to `.env`.
   ```sh
   cp apps/api/.env.example apps/api/.env.local && cp apps/web/.env.example apps/web/.env.local
   ```
   > The `.env` files are intentionally not tracked to avoid committing secrets by accident.

3. Start the Supabase locally.

   ```sh
   pnpm api db:start
   ```

4. Generate and insert seed graph data.

   ```sh
   pnpm api db:seed
   ```

5. Start applications simultaneously.
   ```sh
   pnpm dev
   ```

After completing these steps, the following applications should be up and running locally:

| Local development server | Directory   | Description                             |
| ------------------------ | ----------- | --------------------------------------- |
| http://localhost:3000    | `/apps/web` | The web application                     |
| http://localhost:3001    | `/apps/api` | The backend API for the web application |
| http://localhost:54323   | -           | Local Supabase Studio (requires Docker) |
