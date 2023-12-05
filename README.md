# Heropad

Heropad ([heropad.onrender.com](https://heropad.onrender.com)) is an experimental full-stack application designed to visualize social links. It introduces an innovative way to explore and understand the dynamic network of relationships between heroes, providing insights into the awards they have earned.

Note that the generated hero names and awards are entirely fictional, with no intentional resemblance to the real world.

## 🚀 Highlights

- A full-stack app presenting a pre-generated sociogram from the database to the UI
- Interactive sociogram navigation
- Visualize the connections between related heroes within communities
- Look for heroes and awards with optimal search functionality
- Infinite loading and virtualization for award viewing

## 📺 Preview

![Heropad screenshot](./docs/images/screenshot.jpg?raw=true)

## Built With

The Heropad is built within a monorepository powered by [turborepo](https://turbo.build/repo).

The API is crafted with:

- [Fastify](https://fastify.dev), [tRPC](https://trpc.io), and [superjson](https://github.com/blitz-js/superjson) for running an end-to-end typesafe server
- [Supabase](https://supabase.com) as the database
- [kysely](https://kysely.dev) for typesafe database querying
- [DiceBear](https://www.dicebear.com/) for avatar generation
- [Snaplet](https://www.snaplet.dev) for Postgres data seeding

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
