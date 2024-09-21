import { Avatar, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';
import { useLingui } from '@lingui/react';
import type { Award } from '~/types';
import { AwardAvatar } from '~/components/AwardAvatar';

export interface ListItemAwardProps {
  award?: Award;
  loading?: boolean;
}

export function ListItemAward(props: ListItemAwardProps) {
  const { award, loading } = props;
  const { i18n } = useLingui();

  return award ? (
    <>
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
    </>
  ) : loading ? (
    <>
      <ListItemAvatar>
        <Skeleton variant="circular" animation="wave">
          <Avatar />
        </Skeleton>
      </ListItemAvatar>
      <ListItemText
        primary={<Skeleton animation="wave" />}
        secondary={<Skeleton animation="wave" width="30%" />}
      />
    </>
  ) : null;
}
