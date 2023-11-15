import { ExtractAtomValue } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { api } from '~/utils/api';

export const awardFamily = atomFamily((id: string) =>
  api.award.getAward.atomWithQuery(() => ({ id }))
);

export type Award = Awaited<ExtractAtomValue<ReturnType<typeof awardFamily>>>;
