import { List, ListItem, ListItemAvatar, ListSubheader } from '@mui/material';
import { Trans } from '@lingui/macro';
import type { SearchSuggestion } from '~/types';
import { ListItemLink } from '~/components/ListItemLink';
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
          <ListItemLink to="/$hero" params={{ hero }}>
            <ListItemAvatar>
              <HeroAvatar hero={hero} />
            </ListItemAvatar>
            <SearchSuggestionText text={text} />
          </ListItemLink>
        </ListItem>
      ))}
    </List>
  );
}
