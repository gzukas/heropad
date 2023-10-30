import { EdgeDisplayData, NodeDisplayData } from 'sigma/types';

export type SociogramTheme = 'dark' | 'light';

export interface Node {
  name: string;
  community?: number;
  image?: string;
}

export interface SociogramNodeDisplayData extends Partial<NodeDisplayData> {
  image?: string | null;
}

export type SociogramEdgeDisplayData = Partial<EdgeDisplayData>;
