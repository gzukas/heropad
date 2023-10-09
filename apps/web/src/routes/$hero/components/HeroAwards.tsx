import { useRef, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton
} from '@mui/material';
import { AwardAvatar } from '~/components';
import { useMolecule } from 'bunshi/react';
import { heroAwardMolecule } from '../molecules/heroAwardsMolecule';
import { useDidUpdate } from 'base';

export function HeroAwards() {
  const parentRef = useRef(null);
  const { heroAwardsAtom, fetchNextHeroAwardsAtom } =
    useMolecule(heroAwardMolecule);
  const awards = useAtomValue(heroAwardsAtom);
  const [hasNextPage, fetchNextPage] = useAtom(fetchNextHeroAwardsAtom);

  const virtualizer = useVirtualizer({
    count: hasNextPage ? awards.length + 1 : awards.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56
  });

  useDidUpdate(() => {
    const [lastAward] = [...virtualizer.getVirtualItems()].reverse();
    if (!lastAward) {
      return;
    }
    if (lastAward.index >= awards.length - 1 && hasNextPage) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    awards.length,
    virtualizer.getVirtualItems()
  ]);

  return (
    <List
      component="div"
      ref={parentRef}
      sx={{ overflow: 'auto', display: 'flex', flex: 1 }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          display: 'flex',
          flex: 1,
          position: 'relative'
        }}
      >
        {virtualizer.getVirtualItems().map(virtualRow => {
          const isLoaderRow = virtualRow.index > awards.length - 1;
          const award = awards[virtualRow.index];
          return (
            <ListItem
              key={virtualRow.index}
              component="div"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: `${virtualRow.size}`,
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              {isLoaderRow ? (
                hasNextPage ? (
                  <>
                    <ListItemAvatar>
                      <Skeleton animation="wave" variant="circular" />
                    </ListItemAvatar>
                    <ListItemText primary={<Skeleton animation="wave" />} />
                  </>
                ) : null
              ) : (
                <>
                  <ListItemAvatar>
                    <AwardAvatar from={award.from} to={award.to} />
                  </ListItemAvatar>
                  <ListItemText primary={award.description} />
                </>
              )}
            </ListItem>
          );
        })}
      </div>
    </List>
  );
}
