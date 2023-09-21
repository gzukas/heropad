import { Edge } from 'sociogram';

declare module 'sociogram' {
  export interface Edge {
    id: string;
    givenAt: Date;
    description: string;
    from: string;
    to: string;
  }
}
