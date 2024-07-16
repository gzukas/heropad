import { useMemo } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
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
  const highlightParts = useMemo(
    () => parse(children, match(children, highlight)),
    [children, highlight]
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
