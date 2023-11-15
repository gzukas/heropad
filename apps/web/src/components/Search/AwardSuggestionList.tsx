import { List, ListItem, ListItemAvatar, ListSubheader } from '@mui/material';
import { Trans } from '@lingui/macro';
import { type SearchSuggestion } from '~/atoms';
import { ListItemLink } from '~/components';
import { AwardAvatar } from '../AwardAvatar';
import { SearchSuggestionText } from './SearchSuggestionText';

export interface AwardSuggestionListProps {
  suggestions: SearchSuggestion[];
}

export function AwardSuggestionList(props: AwardSuggestionListProps) {
  return (
    <List
      subheader={
        <ListSubheader>
          <Trans>Awards</Trans>
        </ListSubheader>
      }
    >
      {props.suggestions.map(({ id, text, nodes: [[from], [to]] }) => (
        <ListItem key={id} disablePadding>
          <ListItemLink
            to="/$hero/$awardId"
            params={{ hero: from, awardId: id }}
            {...props}
          >
            <ListItemAvatar>
              <AwardAvatar from={from} to={to} />
            </ListItemAvatar>
            <SearchSuggestionText text={text} />
          </ListItemLink>
        </ListItem>
      ))}
    </List>
  );
}
