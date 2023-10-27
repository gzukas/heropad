import { useRef } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useMolecule } from 'bunshi/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Avatar,
  Box
} from '@mui/material';
import { useLingui } from '@lingui/react';
import { useDidUpdate } from '@heropad/base';
import { AwardAvatar } from '~/components';
import { heroAwardsMolecule } from '../molecules/heroAwardsMolecule';

export function HeroAwards() {
  const listRef = useRef(null);
  const { i18n } = useLingui();

  const { heroAwardsAtom, heroAwardsQueryAtom, fetchNextHeroAwardsAtom } =
    useMolecule(heroAwardsMolecule);
  const heroAwardsQuery = useAtomValue(heroAwardsQueryAtom);
  const awards = useAtomValue(heroAwardsAtom);
  const [hasNextPage, fetchNextPage] = useAtom(fetchNextHeroAwardsAtom);

  const hasMoreAwards =
    hasNextPage || (!awards.length && heroAwardsQuery.state === 'loading');

  const virtualizer = useVirtualizer({
    count: hasMoreAwards ? awards.length + 1 : awards.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 72
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
    <List ref={listRef} component="div" sx={{ overflow: 'auto' }}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`
        }}
      >
        {virtualizer.getVirtualItems().map(virtualItem => {
          const isLoaderRow = virtualItem.index > awards.length - 1;
          const award = awards[virtualItem.index];
          return (
            <ListItem
              key={virtualItem.index}
              component="div"
              disablePadding
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: `${virtualItem.size}`,
                transform: `translateY(${virtualItem.start}px)`
              }}
            >
              {isLoaderRow ? (
                hasMoreAwards ? (
                  <Box
                    sx={{
                      py: 1,
                      px: 2,
                      display: 'flex',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <ListItemAvatar>
                      <Skeleton variant="circular" animation="wave">
                        <Avatar />
                      </Skeleton>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Skeleton animation="wave" />}
                      secondary={<Skeleton animation="wave" width="30%" />}
                    />
                  </Box>
                ) : null
              ) : (
                <ListItemButton>
                  <ListItemAvatar>
                    <AwardAvatar from={award.from} to={award.to} />
                  </ListItemAvatar>
                  <ListItemText
                    primaryTypographyProps={{ noWrap: true }}
                    primary={award.description}
                    secondary={i18n.date(award.givenAt, {
                      dateStyle: 'medium'
                    })}
                  />
                </ListItemButton>
              )}
            </ListItem>
          );
        })}
      </div>
    </List>
  );
}
