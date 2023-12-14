import { Alert, List } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { Trans } from '@lingui/macro';
import { useAtomValue } from 'jotai';
import type { SearchSuggestion } from '~/types';
import { searchSuggestionsByKindAtom } from '~/atoms/searchSuggestionsByKindAtom';
import { debouncedSearchTermAtom } from '~/atoms/searchTermAtom';
import { HeroSuggestionList } from './HeroSuggestionList';
import { AwardSuggestionList } from './AwardSuggestionList';

interface SearchSuggestionGroupRenderParams {
  kind: SearchSuggestion['kind'];
  suggestions: SearchSuggestion[];
}

const groupComponentByKind: Record<
  SearchSuggestion['kind'],
  React.ElementType
> = {
  hero: HeroSuggestionList,
  award: AwardSuggestionList
};

export interface SearchSuggestionsProps {
  sx?: SxProps<Theme>;
}

export function SearchSuggestions(props: SearchSuggestionsProps) {
  const { sx = [] } = props;
  const searchSuggestionsByKind = useAtomValue(searchSuggestionsByKindAtom);
  const debouncedSearchTerm = useAtomValue(debouncedSearchTermAtom);

  const renderGroup = ({
    kind,
    ...other
  }: SearchSuggestionGroupRenderParams) => {
    const GroupComponent = groupComponentByKind[kind];
    return <GroupComponent {...other} />;
  };

  return searchSuggestionsByKind.length > 0 ? (
    <List
      disablePadding
      sx={[
        {
          maxHeight: 400,
          overflow: 'auto',
          '& .MuiListSubheader-root': {
            zIndex: 2
          }
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >
      {searchSuggestionsByKind.map(([kind, suggestions]) => (
        <li key={kind}>
          {renderGroup({
            kind,
            suggestions
          })}
        </li>
      ))}
    </List>
  ) : debouncedSearchTerm ? (
    <Alert severity="info">
      <Trans>
        No results have been found for &quot;<b>{debouncedSearchTerm}</b>&quot;.
      </Trans>
    </Alert>
  ) : null;
}
