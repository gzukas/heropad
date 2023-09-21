import { ListItemAvatar, ListItemButton, ListSubheader } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { type SearchSuggestion as SearchSuggestionType } from '~/atoms';
import { AwardAvatar } from '../AwardAvatar';
import { SearchSuggestionText } from './SearchSuggestionText';
import { SearchSuggestion } from './SearchSuggestion';

export interface AwardGroupProps {
  suggestions: SearchSuggestionType[];
}

export function AwardGroup(props: AwardGroupProps) {
  const { i18n } = useLingui();
  const { suggestions } = props;

  return (
    <ul>
      <ListSubheader>{t(i18n)`Awards`}</ListSubheader>
      {suggestions.map(({ id, text, nodes: [from, to] }) => (
        <SearchSuggestion
          key={id}
          renderButton={props => (
            <ListItemButton
              component={Link as any}
              to="/$hero"
              params={{ hero: to }}
              search={{ award: id }}
              {...props}
            />
          )}
        >
          <ListItemAvatar>
            <AwardAvatar from={from} to={to} />
          </ListItemAvatar>
          <SearchSuggestionText text={text} />
        </SearchSuggestion>
      ))}
    </ul>
  );
}
