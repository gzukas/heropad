import { atomFamily } from 'jotai/utils';
import { api } from '~/utils/api';

export interface AwardFamilyParams {
  id: string;
  signal?: AbortSignal;
}

export const awardFamily = atomFamily(
  ({ id, signal }: AwardFamilyParams) => {
    signal?.addEventListener('abort', () => {
      awardFamily.remove({ id });
    });
    return api.award.getAward.atomWithQuery(() => ({ id }), { signal });
  },
  (a, b) => a.id === b.id
);
