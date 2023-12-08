import { atomFamily } from 'jotai/utils';
import { api } from '~/utils/api';

export const awardFamily = atomFamily((id: string) =>
  api.award.getAward.atomWithQuery(() => ({ id }))
);
