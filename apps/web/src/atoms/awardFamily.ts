import { atomFamily } from 'jotai/utils';
import { api } from '~/utils/api';

export interface AwardFamilyParams {
  id: string;
  signal?: AbortSignal;
}

export const awardFamily = atomFamily(
  ({ id, signal }: AwardFamilyParams) =>
    api.award.getAward.atomWithQuery(() => ({ id }), { signal }),
  (a, b) => a.id === b.id
);
