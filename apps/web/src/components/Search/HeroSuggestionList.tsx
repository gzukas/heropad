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
import { HeroAvatar } from '../HeroAvatar';
import { SearchSuggestionText } from './SearchSuggestionText';
import { useCloseSearch } from './useCloseSearch';

export interface HeroSuggestionListProps {
  suggestions: SearchSuggestion[];
}

export function HeroSuggestionList(props: HeroSuggestionListProps) {
  const closeSearch = useCloseSearch();
  return (
    <List
      subheader={
        <ListSubheader sx={{ bgcolor: 'inherit' }}>
          <Trans>Heroes</Trans>
        </ListSubheader>
      }
    >
      {props.suggestions.map(({ id, text, nodes: [[hero]] }) => (
        <ListItem key={id} onClick={closeSearch} disablePadding>
          <ListItemButton component={Link} to="/$hero" params={{ hero }}>
            <ListItemAvatar>
              <HeroAvatar hero={hero} />
            </ListItemAvatar>
            <SearchSuggestionText text={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
