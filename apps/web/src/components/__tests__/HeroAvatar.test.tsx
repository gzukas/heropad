import { render, screen } from '@testing-library/react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';
import { setupServer } from '~/__mocks__/setupServer';
import { HeroAvatar } from '../HeroAvatar';

describe('HeroAvatar', () => {
  setupServer(trpcMsw => [
    trpcMsw.graph.getGraph.query(() => ({
      nodes: [{ username: 'foo', name: 'Foo' }],
      edges: []
    }))
  ]);

  it('should render an avatar image', async () => {
    render(<HeroAvatar hero="foo" />, { wrapper: CssVarsProvider });
    const img = (await screen.findByAltText('Foo')) as HTMLImageElement;
    expect(img.src).toMatch(/foo.svg$/);
  });
});
