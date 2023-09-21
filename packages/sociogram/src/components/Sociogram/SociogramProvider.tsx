import React from 'react';
import { useState, useContext } from 'react';
import { Provider as JotaiProvider, createStore } from 'jotai';
import { MultiDirectedGraph } from 'graphology';
import { useHydrateAndSyncAtoms } from 'base';
import type { SociogramTheme, Node } from '../../types';
import { graphAtom, themeAtom } from '../../atoms';

type Store = ReturnType<typeof createStore>;

const SociogramStoreContext = React.createContext<Store | null>(null);
const defaultGraph = new MultiDirectedGraph<Node>();

export interface SociogramProviderProps {
  graph?: MultiDirectedGraph<Node>;
  theme?: SociogramTheme;
}

export function SociogramProvider(
  props: React.PropsWithChildren<SociogramProviderProps>
) {
  const { graph = defaultGraph, theme = 'dark', children } = props;
  const [store] = useState(() => createStore());

  useHydrateAndSyncAtoms(
    [
      [graphAtom, graph],
      [themeAtom, theme]
    ],
    { store }
  );

  return (
    <SociogramStoreContext.Provider value={store}>
      <JotaiProvider store={store}>{children}</JotaiProvider>
    </SociogramStoreContext.Provider>
  );
}

export function useSociogramStore() {
  const store = useContext(SociogramStoreContext);
  if (!store) {
    throw new Error('Use `SociogramProvider` higher up in the tree.');
  }
  return store;
}
