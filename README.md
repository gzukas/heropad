# Heropad

Heropad is an experimental sociogram visualization tool, providing an innovative way to explore and understand the dynamic network of relationships between heroes. It offers insights into the awards they have earned.

The tool serves as a demonstration platform, showcasing a variety of technologies.

## 🚀 Highlights

- Interactive sociogram navigation.
- Community detection for grouping related heroes.
- Search functionality for heroes and awards.
- Optimized award viewing through infinite loading and virtualization.

## 📺 Preview

![Alt text](./docs/images/screenshot.jpg?raw=true 'Title')

## Technology Stack

The Heropad is built within a monorepository powered by [turborepo](https://turbo.build/repo).

The API is crafted with:

- [Fastify](https://fastify.dev) and [tRPC](https://trpc.io) for running an end-to-end typesafe server
- [Supabase](https://supabase.com) for database
- [kysely](https://kysely.dev) for typesafe database querying
- [Snaplet](https://www.snaplet.dev) for seeding

For the web application, the following is used:

- [React](https://react.dev)
- [Material UI](https://mui.com)
- [Vite](https://vitejs.dev) as frontend tooling
- [Jotai](https://jotai.org) with [Bunshi](https://www.bunshi.org/) for state management
- [Graphology](https://graphology.github.io) as graph data structure
- [Sigma.js](https://www.sigmajs.org), with the helping hand of [React Sigma](https://sim51.github.io/react-sigma), for graph rendering
- [Lingui](https://lingui.dev) as internationalization framework
- [Tanstack Router](https://tanstack.com/router) for routing
- [Tanstack Virtual](https://tanstack.com/virtual) for virtualizing large award lists
