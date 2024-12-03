<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./media/logo-light.png">
    <img alt="Heropad'" src="./media/light-dark.png">
  </picture>
</p>

<h1 align="center">Heropad</h1>

Heropad is an experimental full-stack application that visualizes social links. Designed as a **foundational app**, Heropad provides a starting point for exploring dynamic relationships in a network and can be extended for similar applications. It offers a way to understand the interconnectedness between heroes and the awards they have earned, providing valuable insights through an interactive sociogram.

Please note that all hero names and awards are entirely fictional and bear no resemblance to real-world.

## Live Demo

[Check out the live demo](https://heropad.gzukas.lt)

## 🚀 Key Features

- A full-stack application that generates a sociogram from the database and displays it on the UI
- Interactive navigation within the sociogram to explore hero relationships
- Visualize connections between heroes within their respective communities
- Search functionality to find heroes and awards
- Infinite loading and virtualization for award list viewing

## Getting Started

To set up Heropad on your local machine, follow the step-by-step guide in the [Getting Started](./GETTING_STARTED.md).

## 🛠 Built With

Heropad is built within a monorepository powered by [turborepo](https://turbo.build/repo).

### Backend

- [Fastify](https://fastify.dev), [tRPC](https://trpc.io), and [superjson](https://github.com/blitz-js/superjson) for a fully typesafe API
- [Postgres](https://www.postgresql.org) as the database, managed via [Supabase](https://supabase.com)
- [Kysely](https://kysely.dev) for typesafe database querying
- [TypeBox](https://github.com/sinclairzx81/typebox) for input validation
- [DiceBear](https://www.dicebear.com/) for generating avatars

### Frontend

- [React](https://react.dev)
- [Material UI](https://mui.com)
- [Vite](https://vitejs.dev) for fast development tooling
- [Jotai](https://jotai.org) for lightweight state management
- [Graphology](https://graphology.github.io) for representing graph data
- [Sigma.js](https://www.sigmajs.org) with [React Sigma](https://sim51.github.io/react-sigma) for graph rendering
- [Lingui](https://lingui.dev) for internationalization
- [Tanstack Router](https://tanstack.com/router) for routing
- [Tanstack Virtual](https://tanstack.com/virtual) for virtualizing long award lists

### Testing

- [Vitest](https://vitest.dev) for running tests
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for testing React components and hooks
- [MSW](https://mswjs.io) and [msw-trpc](https://github.com/maloguertin/msw-trpc) for mocking API requests
