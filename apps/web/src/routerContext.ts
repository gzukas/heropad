import { RouterContext } from '@tanstack/react-router';
import { getAppStore } from './context/getAppStore';

export const routerContext = new RouterContext<{
  store: ReturnType<typeof getAppStore>;
}>();
