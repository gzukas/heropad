/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as IndexImport } from './routes/index';
import { Route as heroHeroImport } from './routes/(hero)/$hero';
import { Route as heroHeroAwardIdImport } from './routes/(hero)/$hero.$awardId';

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute
} as any);

const heroHeroRoute = heroHeroImport.update({
  id: '/(hero)/$hero',
  path: '/$hero',
  getParentRoute: () => rootRoute
} as any);

const heroHeroAwardIdRoute = heroHeroAwardIdImport.update({
  id: '/$awardId',
  path: '/$awardId',
  getParentRoute: () => heroHeroRoute
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/(hero)/$hero': {
      id: '/(hero)/$hero';
      path: '/$hero';
      fullPath: '/$hero';
      preLoaderRoute: typeof heroHeroImport;
      parentRoute: typeof rootRoute;
    };
    '/(hero)/$hero/$awardId': {
      id: '/(hero)/$hero/$awardId';
      path: '/$awardId';
      fullPath: '/$hero/$awardId';
      preLoaderRoute: typeof heroHeroAwardIdImport;
      parentRoute: typeof heroHeroImport;
    };
  }
}

// Create and export the route tree

interface heroHeroRouteChildren {
  heroHeroAwardIdRoute: typeof heroHeroAwardIdRoute;
}

const heroHeroRouteChildren: heroHeroRouteChildren = {
  heroHeroAwardIdRoute: heroHeroAwardIdRoute
};

const heroHeroRouteWithChildren = heroHeroRoute._addFileChildren(
  heroHeroRouteChildren
);

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute;
  '/$hero': typeof heroHeroRouteWithChildren;
  '/$hero/$awardId': typeof heroHeroAwardIdRoute;
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute;
  '/$hero': typeof heroHeroRouteWithChildren;
  '/$hero/$awardId': typeof heroHeroAwardIdRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/': typeof IndexRoute;
  '/(hero)/$hero': typeof heroHeroRouteWithChildren;
  '/(hero)/$hero/$awardId': typeof heroHeroAwardIdRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: '/' | '/$hero' | '/$hero/$awardId';
  fileRoutesByTo: FileRoutesByTo;
  to: '/' | '/$hero' | '/$hero/$awardId';
  id: '__root__' | '/' | '/(hero)/$hero' | '/(hero)/$hero/$awardId';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  heroHeroRoute: typeof heroHeroRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  heroHeroRoute: heroHeroRouteWithChildren
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/(hero)/$hero"
      ]
    },
    "/": {
      "filePath": "index.ts"
    },
    "/(hero)/$hero": {
      "filePath": "(hero)/$hero.tsx",
      "children": [
        "/(hero)/$hero/$awardId"
      ]
    },
    "/(hero)/$hero/$awardId": {
      "filePath": "(hero)/$hero.$awardId.tsx",
      "parent": "/(hero)/$hero"
    }
  }
}
ROUTE_MANIFEST_END */
