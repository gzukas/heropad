import { render, screen } from '@testing-library/react';
import { Highlight } from '../Highlight';

describe('Highlight', () => {
  it('renders the children text', () => {
    render(<Highlight highlight="">Hello World</Highlight>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('highlights the matching part of the text', () => {
    render(<Highlight highlight="world">Hello World</Highlight>);
    expect(screen.getByRole('mark')).toHaveTextContent('World');
  });

  it('does not highlight when there is no match', () => {
    render(<Highlight highlight="Foo">Hello World</Highlight>);
    expect(screen.queryByRole('mark')).not.toBeInTheDocument();
  });

  it('handles empty highlight string', () => {
    render(<Highlight highlight="">Hello World</Highlight>);
    expect(screen.queryByRole('mark')).not.toBeInTheDocument();
  });
});
