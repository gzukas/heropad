import {
  AnyRoute,
  MakeLinkOptions,
  RegisteredRouter,
  RoutePaths
} from '@tanstack/react-router';

export type Extract<T> = T extends (infer K)[]
  ? K
  : T extends Map<infer K, infer V>
  ? [K, V]
  : never;

export interface RouterLinkComponent<TElement extends React.ElementType> {
  <
    TRouteTree extends AnyRoute = RegisteredRouter['routeTree'],
    TFrom extends RoutePaths<TRouteTree> = '/',
    TTo extends string = ''
  >(
    props: React.ComponentProps<TElement> &
      MakeLinkOptions<TRouteTree, TFrom, TTo>
  ): React.ReactNode;
}
