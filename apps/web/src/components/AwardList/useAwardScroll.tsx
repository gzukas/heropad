import { useMemo, useRef, useCallback } from 'react';
import { useAtomValue } from 'jotai';
import {
  GroupedVirtuosoHandle,
  GroupedVirtuosoProps,
  ListRange
} from 'react-virtuoso';
import { Edge } from 'sociogram';
import { useDidUpdate } from 'base';
import { selectAwardIndicesAtom } from './selectAwardIndicesAtom';

function rangeContainsInclusive(range: ListRange, value: number) {
  return value >= range.startIndex && value <= range.endIndex;
}

export interface UseAwardScrollContext {
  activeAwardIndex?: number;
}

export interface UseAwardScrollOptions {
  awards: Edge[];
  activeAwardId?: string;
  onActiveAwardOutsideRange?: () => void;
}

export interface UseAwardScrollResult {
  ref: React.RefObject<GroupedVirtuosoHandle>;
  GroupedVirtuosoProps: Partial<
    GroupedVirtuosoProps<unknown, UseAwardScrollContext>
  >;
}

export function useAwardScroll(
  options: UseAwardScrollOptions
): UseAwardScrollResult {
  const { awards, activeAwardId, onActiveAwardOutsideRange } = options;

  const ref = useRef<GroupedVirtuosoHandle>(null);
  const awardIndicesById = useAtomValue(
    useMemo(() => selectAwardIndicesAtom(awards), [awards])
  );
  const activeAwardIndex = activeAwardId
    ? awardIndicesById.get(activeAwardId)
    : undefined;

  const rangeChanged = useCallback(
    (range: ListRange) => {
      if (
        activeAwardIndex &&
        !rangeContainsInclusive(range, activeAwardIndex)
      ) {
        onActiveAwardOutsideRange?.();
      }
    },
    [activeAwardIndex, onActiveAwardOutsideRange]
  );

  useDidUpdate(() => {
    if (activeAwardIndex) {
      ref.current?.scrollToIndex(activeAwardIndex);
    }
  }, [activeAwardIndex]);

  return {
    ref,
    GroupedVirtuosoProps: {
      context: {
        activeAwardIndex
      },
      ...(activeAwardIndex && {
        rangeChanged,
        initialTopMostItemIndex: activeAwardIndex
      })
    }
  };
}
