import { useRef } from 'react';
import {
  GroupedVirtuosoHandle,
  GroupedVirtuosoProps,
  IndexLocationWithAlign
} from 'react-virtuoso';
import { useDidUpdate } from 'base';

export interface UseVirtuosoScrollToIndexContext {
  scrollToIndex?: number | IndexLocationWithAlign;
}

export interface UseVirtuosoScrollToIndexResults {
  ref: React.RefObject<GroupedVirtuosoHandle>;
  GroupedVirtuosoProps: Partial<
    GroupedVirtuosoProps<unknown, UseVirtuosoScrollToIndexContext>
  >;
}

export function useVirtuosoScrollToIndex(
  scrollToIndex?: number | IndexLocationWithAlign
): UseVirtuosoScrollToIndexResults {
  const ref = useRef<GroupedVirtuosoHandle>(null);

  useDidUpdate(() => {
    if (scrollToIndex) {
      ref.current?.scrollToIndex(scrollToIndex);
    }
  }, [scrollToIndex]);

  return {
    ref,
    GroupedVirtuosoProps: {
      context: {
        scrollToIndex
      },
      ...(scrollToIndex && {
        initialTopMostItemIndex: scrollToIndex
      })
    }
  };
}
