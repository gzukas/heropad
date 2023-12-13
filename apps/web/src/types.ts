import type {
  AnyRoute,
  MakeLinkOptions,
  RegisteredRouter,
  RoutePaths
} from '@tanstack/react-router';

export type {
  Hero,
  Award,
  AwardInput,
  AwardsInput,
  SearchSuggestion
} from '../../api/src/trpc/appRouter';

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
