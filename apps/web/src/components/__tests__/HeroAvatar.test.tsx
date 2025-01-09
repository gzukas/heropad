import { render, screen } from '@testing-library/react';
import { setupServer } from '~/testing/setupServer';
import { HeroAvatar } from '../HeroAvatar';

// TODO: RTT incompatibility with React 19 (https://github.com/testing-library/react-testing-library/issues/1375)
describe.skip('HeroAvatar', () => {
  setupServer(trpcMsw => [
    trpcMsw.graph.getGraph.query(() => ({
      nodes: [{ username: 'foo', name: 'Foo' }],
      edges: []
    }))
  ]);

  it('should render an avatar image', async () => {
    render(<HeroAvatar hero="foo" />);
    const img = (await screen.findByAltText('Foo')) as HTMLImageElement;
    expect(img.src).toMatch(/foo.svg$/);
  });
});
