import { useMatches } from '@tanstack/react-router';

/**
 * Returns the accumulated content shift value (in pixels).
 *
 * The value is calculated by iterating through the route matches and summing up the
 * `shiftContentBy` values specified in the route context.
 */
export function useAccumulatedContentShift() {
  return useMatches({
    select: matches =>
      matches.reduce(
        (shift, match) => shift + (match.routeContext.shiftContentBy ?? 0),
        0
      )
  });
}
