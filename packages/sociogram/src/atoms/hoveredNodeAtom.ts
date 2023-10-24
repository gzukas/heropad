import { atomWithDebounce } from '@heropad/base';

export const [hoveredNodeAtom, debouncedHoveredAtom] = atomWithDebounce<
  string | null
>(null, 40);
