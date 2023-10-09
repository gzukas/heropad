import { Tab, TabProps } from '@mui/material';

import {
  AnyRoute,
  MakeLinkOptions,
  RegisteredRouter,
  Link,
  RoutePaths
} from '@tanstack/react-router';

export function TabLink<
  TRouteTree extends AnyRoute = RegisteredRouter['routeTree'],
  TFrom extends RoutePaths<TRouteTree> = '/',
  TTo extends string = ''
>(props: MakeLinkOptions<TRouteTree, TFrom, TTo> & TabProps) {
  return <Tab {...props} component={Link as any} />;
}
