import { ListItemText } from '@mui/material';
import { useAtomValue } from 'jotai';
import { Highlight } from '~/components/Highlight';
import { searchTermAtom } from '~/atoms/searchTermAtom';

export interface SearchSuggestionTextProps {
  text: string;
}

export function SearchSuggestionText(props: SearchSuggestionTextProps) {
  const { text } = props;
  const searchTerm = useAtomValue(searchTermAtom);

  return (
    <ListItemText
      primary={<Highlight highlight={searchTerm}>{text}</Highlight>}
    />
  );
}
