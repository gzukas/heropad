import { List, ListProps } from '@mui/material';

export type SearchListProps<C extends React.ElementType> = ListProps<
  C,
  { component?: C }
>;

export function SearchList<C extends React.ElementType>(
  props: SearchListProps<C>
) {
  const { sx = [], ...other } = props;
  return (
    <List
      disablePadding
      sx={[
        {
          maxHeight: 400,
          overflow: 'auto'
        },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
      {...other}
    />
  );
}
