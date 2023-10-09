import React, { Suspense } from 'react';
import { useState, useContext } from 'react';
import { Provider as JotaiProvider, createStore } from 'jotai';
import { getAppStore } from './getAppStore';

type Store = ReturnType<typeof createStore>;

const AppStoreContext = React.createContext<Store | null>(null);

export function AppStoreProvider({ children }: React.PropsWithChildren) {
  const [store] = useState(() => getAppStore());
  return (
    <AppStoreContext.Provider value={store}>
      <JotaiProvider store={store}>{children}</JotaiProvider>
    </AppStoreContext.Provider>
  );
}

export function useAppStore() {
  const store = useContext(AppStoreContext);
  if (!store) {
    throw new Error('Use `AppStoreProvider` higher up in the tree.');
  }
  return store;
}
