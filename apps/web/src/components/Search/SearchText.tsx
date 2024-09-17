import { ListItemText } from '@mui/material';
import { useAtomValue } from 'jotai';
import { Highlight } from '~/components/Highlight';
import { searchTermAtom } from '~/atoms/searchTermAtom';

export interface SearchTextProps {
  children: string;
}

export function SearchText({ children }: SearchTextProps) {
  const searchTerm = useAtomValue(searchTermAtom);
  return (
    <ListItemText
      primary={<Highlight highlight={searchTerm}>{children}</Highlight>}
    />
  );
}
