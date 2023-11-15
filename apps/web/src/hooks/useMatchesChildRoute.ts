import { useMatch, useMatches } from '@tanstack/react-router';

export function useMatchesChildRoute() {
  const { routeId } = useMatch({ strict: false });
  return useMatches({
    select: matches => [...matches].pop()?.routeId !== routeId
  });
}
