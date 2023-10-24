import { Edge } from '@heropad/sociogram';

declare module '@heropad/sociogram' {
  export interface Edge {
    id: string;
    givenAt: Date;
    description: string;
    from: string;
    to: string;
  }
}
