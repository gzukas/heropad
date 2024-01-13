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

export interface RouterLinkComponent<TProps> {
  <
    TRouteTree extends AnyRoute = RegisteredRouter['routeTree'],
    TFrom extends RoutePaths<TRouteTree> = '/',
    TTo extends string = ''
  >(
    props: LinkOptions<TRouteTree, TFrom, TTo> & TProps
  ): React.ReactNode;
}
