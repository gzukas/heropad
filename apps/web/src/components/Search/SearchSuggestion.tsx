import { ListItem, ListItemButton, ListItemButtonProps } from '@mui/material';
import { useSetAtom } from 'jotai';
import { isSearchOpenAtom } from '~/atoms';

export interface SearchSuggestionProps {
  renderButton?: (props: ListItemButtonProps) => React.ReactNode;
  children?: React.ReactNode;
}

export function SearchSuggestion(props: SearchSuggestionProps) {
  const { children, renderButton = ListItemButton } = props;
  const toggleSearch = useSetAtom(isSearchOpenAtom);

  const handleClick = () => {
    toggleSearch(false);
  };

  return (
    <ListItem disablePadding>
      {renderButton({ onClick: handleClick, children })}
    </ListItem>
  );
}
