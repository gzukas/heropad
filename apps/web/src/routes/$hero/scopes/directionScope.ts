import { createScope } from 'bunshi';

export const DirectionScope = createScope<'received' | 'given'>('received');
