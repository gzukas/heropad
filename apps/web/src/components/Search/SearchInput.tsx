import { InputAdornment, InputBase, InputBaseProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  debouncedSearchTermAtom,
  searchTermAtom
} from '~/atoms/searchTermAtom';

export type SearchInputProps = Omit<InputBaseProps, 'value' | 'onChange'>;

export function SearchInput(props: SearchInputProps) {
  const { sx = [], ...other } = props;
  const searchTerm = useAtomValue(searchTermAtom);
  const setDebouncedSearchTerm = useSetAtom(debouncedSearchTermAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedSearchTerm(event.target.value);
  };

  return (
    <InputBase
      sx={[
        {
          px: 2,
          py: 1,
          flex: 1,
          fontSize: '1.2rem'
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      value={searchTerm}
      onChange={handleInputChange}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      {...other}
    />
  );
}
