import React, { useRef } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useMolecule } from 'bunshi/react';
import {
  VirtualItem,
  VirtualizerOptions,
  useVirtualizer
} from '@tanstack/react-virtual';
import { List, ListItem, useForkRef, ListItemProps } from '@mui/material';
import { useDidUpdate } from '@heropad/base';
import { Award } from '~/atoms/awardFamily';
import { ListItemAward } from '~/components/ListItemAward';
import { heroAwardsMolecule } from '../molecules/heroAwardsMolecule';

export type RenderAwardFunction = (
  options: { award?: Award; virtualAward: VirtualItem },
  props: ListItemProps
) => React.ReactNode;

export interface HeroAwardsProps {
  virtualizerOptions?: Partial<VirtualizerOptions<HTMLElement, Element>>;
  renderAward?: RenderAwardFunction;
  children?: React.ReactNode;
}

export const HeroAwards = React.forwardRef<HTMLElement, HeroAwardsProps>(
  (props, ref) => {
    const {
      virtualizerOptions,
      children,
      renderAward = ({ award, virtualAward }, props) => (
        <ListItem key={virtualAward.index} {...props}>
          <ListItemAward award={award} loading={!Boolean(award)} />
        </ListItem>
      )
    } = props;

    const listRef = useRef<HTMLElement>(null);
    const handleListRef = useForkRef(listRef, ref);

    const { awardsAtom, fetchNextPageAtom, loadableQueryAtom } =
      useMolecule(heroAwardsMolecule);
    const awards = useAtomValue(awardsAtom);
    const [hasNextPage, fetchNextPage] = useAtom(fetchNextPageAtom);
    const loadableQuery = useAtomValue(loadableQueryAtom);
    const hasMoreAwards =
      hasNextPage || (!awards.length && loadableQuery.state === 'loading');

    const virtualizer = useVirtualizer({
      count: hasMoreAwards ? awards.length + 1 : awards.length,
      getScrollElement: () => listRef.current,
      estimateSize: () => 72,
      ...virtualizerOptions
    });

    useDidUpdate(() => {
      const lastAward = [...virtualizer.getVirtualItems()].pop();
      if (hasNextPage && lastAward && lastAward.index >= awards.length - 1) {
        fetchNextPage();
      }
    }, [
      virtualizer.getVirtualItems(),
      hasNextPage,
      awards.length,
      fetchNextPage
    ]);

    return (
      <List
        ref={handleListRef}
        component="div"
        sx={{ overflow: 'auto' }}
        disablePadding
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`
          }}
        >
          {virtualizer.getVirtualItems().map(virtualAward =>
            renderAward(
              { award: awards[virtualAward.index], virtualAward },
              {
                component: 'div',
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: `${virtualAward.size}`,
                  transform: `translateY(${virtualAward.start}px)`
                }
              }
            )
          )}
          {children}
        </div>
      </List>
    );
  }
);
