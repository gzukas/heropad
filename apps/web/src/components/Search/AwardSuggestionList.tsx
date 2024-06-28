import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListSubheader
} from '@mui/material';
import { Trans } from '@lingui/macro';
import { Link } from '@tanstack/react-router';
import type { SearchSuggestion } from '~/types';
import { AwardAvatar } from '../AwardAvatar';
import { SearchSuggestionText } from './SearchSuggestionText';
import { useCloseSearch } from './useCloseSearch';

export interface AwardSuggestionListProps {
  suggestions: SearchSuggestion[];
}

export function AwardSuggestionList(props: AwardSuggestionListProps) {
  const closeSearch = useCloseSearch();
  return (
    <List
      subheader={
        <ListSubheader sx={{ bgcolor: 'inherit' }}>
          <Trans>Awards</Trans>
        </ListSubheader>
      }
    >
      {props.suggestions.map(({ id, text, nodes: [[from], [to]] }) => (
        <ListItem key={id} onClick={closeSearch} disablePadding>
          <ListItemButton
            component={Link}
            to="/$hero/$awardId"
            params={{ hero: from, awardId: id }}
            search={{ direction: 'given' }}
          >
            <ListItemAvatar>
              <AwardAvatar from={from} to={to} />
            </ListItemAvatar>
            <SearchSuggestionText text={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
