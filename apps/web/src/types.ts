export type Extract<T> = T extends (infer K)[]
  ? K
  : T extends Map<infer K, infer V>
  ? [K, V]
  : never;
