# Getting Started with Heropad

To begin using Heropad, ensure you have the following dependencies installed and configured:

- [Node.js](https://nodejs.org/) (version 22.x or later)
- [pnpm](https://pnpm.io/) (version 9.x or later)
- [Docker](https://docs.docker.com/get-docker/) (required to run the local database; [Podman Desktop](https://podman-desktop.io/) can be used as an alternative)

Follow these steps to set up and run Heropad locally:

1. **Install dependencies**

   - Open a terminal and navigate to the root of the Heropad repository.
   - Install the required dependencies using pnpm:
     ```sh
     pnpm install
     ```

2. **Set up environment variables**

   - Copy the `.env.example` files to `.env.local` files for both the API and web applications:
     ```sh
     cp apps/api/.env.example apps/api/.env.local
     cp apps/web/.env.example apps/web/.env.local
     ```
   - The `.env.local` files are used for local development and are not tracked in the repository to avoid committing sensitive information.

3. **Start the local Supabase database**

   - Run the following command to start the Supabase database locally:
     ```sh
     pnpm api db:start
     ```

4. **Seed the database with initial data**

   - Generate and insert seed graph data into the local Supabase database:
     ```sh
     pnpm api db:seed
     ```

5. **Start the development servers**
   - Run the following command to start both the API and web applications simultaneously:
     ```sh
     pnpm dev
     ```

After completing these steps, you should have the following local development servers running:

| Server          | URL                      | Description                             |
| --------------- | ------------------------ | --------------------------------------- |
| Web application | `http://localhost:3000`  | The Heropad web application             |
| API server      | `http://localhost:3001`  | The backend API for the web application |
| Supabase Studio | `http://localhost:54323` | Local Supabase Studio (requires Docker) |

Now you can start exploring and developing Heropad locally. If you encounter any issues or have further questions, please refer to the project's documentation or reach out to the Heropad team.
