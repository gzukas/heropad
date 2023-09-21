import { ListItemAvatar, ListItemButton, ListSubheader } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { type SearchSuggestion as SearchSuggestionType } from '~/atoms';
import { HeroAvatar } from '../HeroAvatar';
import { SearchSuggestionText } from './SearchSuggestionText';
import { SearchSuggestion } from './SearchSuggestion';

export interface HeroGroupProps {
  suggestions: SearchSuggestionType[];
}

export function HeroGroup(props: HeroGroupProps) {
  const { i18n } = useLingui();
  const { suggestions } = props;

  return (
    <ul>
      <ListSubheader>{t(i18n)`Heroes`}</ListSubheader>
      {suggestions.map(({ id, text, nodes: [hero] }) => (
        <SearchSuggestion
          key={id}
          renderButton={props => (
            <ListItemButton
              component={Link as any}
              to="/$hero"
              params={{ hero }}
              {...props}
            />
          )}
        >
          <ListItemAvatar>
            <HeroAvatar hero={hero} />
          </ListItemAvatar>
          <SearchSuggestionText text={text} />
        </SearchSuggestion>
      ))}
    </ul>
  );
}
