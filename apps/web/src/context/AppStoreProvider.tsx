import React, { Suspense } from 'react';
import { useState, useContext } from 'react';
import { Provider as JotaiProvider, createStore } from 'jotai';

type Store = ReturnType<typeof createStore>;

const AppStoreContext = React.createContext<Store | null>(null);

export function AppStoreProvider({ children }: React.PropsWithChildren) {
  const [store] = useState(() => createStore());
  return (
    <AppStoreContext.Provider value={store}>
      <JotaiProvider store={store}>
        <Suspense fallback="Loading">{children}</Suspense>
      </JotaiProvider>
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
