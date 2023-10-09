import { createStore } from 'jotai';

const appStore = createStore();

export function getAppStore() {
  return appStore;
}
