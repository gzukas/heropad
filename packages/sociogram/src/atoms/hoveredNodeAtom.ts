import { atomWithDebounce } from 'base';

export const [hoveredNodeAtom, debouncedHoveredAtom] = atomWithDebounce<
  string | null
>(null, 40);
