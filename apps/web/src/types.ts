import type {
  AnyRoute,
  LinkOptions,
  RegisteredRouter,
  RoutePaths
} from '@tanstack/react-router';

export type {
  Hero,
  Award,
  AwardsOutput,
  SearchSuggestion
} from '../../api/src/trpc/appRouter';

export interface RouterLinkComponent<TElement extends React.ElementType> {
  <
    TRouteTree extends AnyRoute = RegisteredRouter['routeTree'],
    TFrom extends RoutePaths<TRouteTree> = '/',
    TTo extends string = ''
  >(
    props: React.ComponentProps<TElement> & LinkOptions<TRouteTree, TFrom, TTo>
  ): React.ReactNode;
}
