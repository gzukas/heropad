import { List } from '@mui/material';
import { useAtomValue } from 'jotai';
import type { SearchSuggestion } from '~/types';
import { searchSuggestionsByKindAtom } from '~/atoms/searchSuggestionsByKindAtom';
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

export function SearchSuggestions() {
  const searchSuggestionsByKind = useAtomValue(searchSuggestionsByKindAtom);

  const renderGroup = ({
    kind,
    ...other
  }: SearchSuggestionGroupRenderParams) => {
    const GroupComponent = groupComponentByKind[kind];
    return <GroupComponent {...other} />;
  };

  return (
    <List
      disablePadding
      sx={{
        bgcolor: 'background.paper',
        position: 'relative',
        maxHeight: 400,
        overflow: 'auto',
        '& ul': { padding: 0 },
        '& .MuiListSubheader-root': {
          zIndex: 2
        }
      }}
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
  );
}
