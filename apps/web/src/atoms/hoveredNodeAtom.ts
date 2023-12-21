import { atomWithDebounce } from '~/utils/atomWithDebounce';

export const [hoveredNodeAtom, debouncedHoveredAtom] = atomWithDebounce<
  string | null
>(null, 40);
