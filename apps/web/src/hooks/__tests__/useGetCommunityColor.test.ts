import { renderHook, waitFor } from '@testing-library/react';
import { useGetCommunityColor } from '../useGetCommunityColor';
import { setupServer } from '~/testing/setupServer';

// TODO: RTT incompatibility with React 19 (https://github.com/testing-library/react-testing-library/issues/1375)
describe.skip('useGetCommunityColor', () => {
  setupServer(trpcMsw => [
    trpcMsw.graph.getGraph.query(() => ({
      nodes: [
        { username: 'foo', name: 'Foo' },
        { username: 'bar', name: 'Bar' }
      ],
      edges: [{ from: 'foo', to: 'bar' }]
    }))
  ]);

  const waitForResult = <T>(result: { current: T }) =>
    waitFor(() => {
      expect(result.current).not.toBeNull();
      return result.current;
    });

  it('should return distinct color for each community', async () => {
    const { result, rerender } = renderHook(
      name => useGetCommunityColor()(name),
      {
        initialProps: 'foo'
      }
    );

    const fooColor = await waitForResult(result);
    rerender('bar');
    const barColor = await waitForResult(result);

    expect(fooColor).not.toBe(barColor);
  });

  it('should throw if there are more communities than colors', async () => {
    expect(() =>
      renderHook(
        () =>
          useGetCommunityColor({
            palette: { dark: ['#fff'], light: ['#000'] }
          })('foo'),
        {}
      )
    ).toThrowError('Palette has 1 color(s), but there are 2 community(ies)');
  });
});
