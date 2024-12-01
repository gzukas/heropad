import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';
import type { Award } from '~/types';
import { AwardAvatar } from '~/components/AwardAvatar';
import { Hero } from '~/components/Hero';
import { DateTime } from '~/components/DateTime';

export interface ListItemAwardProps {
  award?: Award;
  loading?: boolean;
}

export function ListItemAward(props: ListItemAwardProps) {
  const { award, loading } = props;

  return award ? (
    <>
      <ListItemAvatar>
        <AwardAvatar from={award.from} to={award.to} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Stack gap={1} flexDirection="row" alignItems="center">
            <Hero hero={award.from} sx={{ fontWeight: 500 }} />
            <Typography variant="caption" color="textSecondary">
              <DateTime dateStyle="medium">{award.givenAt}</DateTime>
            </Typography>
          </Stack>
        }
        secondary={<Typography noWrap>{award.description}</Typography>}
        disableTypography
      />
    </>
  ) : loading ? (
    <>
      <ListItemAvatar>
        <Skeleton variant="circular" animation="wave">
          <Avatar />
        </Skeleton>
      </ListItemAvatar>
      <ListItemText
        primary={<Skeleton animation="wave" width="50%" />}
        secondary={<Skeleton animation="wave" />}
      />
    </>
  ) : null;
}
