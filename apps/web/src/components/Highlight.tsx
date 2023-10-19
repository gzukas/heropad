import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { amber } from '@mui/material/colors';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

export interface HighlightProps {
  highlight: string;
  children: string;
}

const Mark = styled('mark')({
  backgroundColor: amber['A200']
});

export function Highlight(props: HighlightProps) {
  const { highlight, children } = props;
  const highlightParts = parse(
    children,
    match(children, highlight, { insideWords: true })
  );

  return (
    <>
      {highlightParts.map((part, i) => (
        <Box key={i} component={part.highlight ? Mark : 'span'}>
          {part.text}
        </Box>
      ))}
    </>
  );
}
