import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { blendColor } from '~/utils/blendColor';

export type BlendedColorFamilyParams = Parameters<typeof blendColor>;

/**
 * A family of atoms representing colors blended by alpha.
 *
 * This is intended for use in contexts where explicit alpha modifier is unsupported,
 * such as sigma's WebGL-based node renderers.
 *
 * @see {@link blendColor}
 */
export const blendedColorFamily = atomFamily(
  (params: BlendedColorFamilyParams) => atom(blendColor(...params)),
  (a, b) => a.every((item, index) => item === b[index])
);
