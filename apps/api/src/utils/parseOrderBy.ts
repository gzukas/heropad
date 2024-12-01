type Sort = `-${string}` | string;

export type OrderByDirection = 'asc' | 'desc';
export type OrderBy<T extends Sort> = T extends `-${infer U}` ? U : T;

export function parseOrderBy<T extends Sort>(
  sort: T
): [OrderBy<T>, OrderByDirection] {
  const isDescending = sort.startsWith('-');
  return [
    (isDescending ? sort.slice(1) : sort) as OrderBy<T>,
    isDescending ? 'desc' : 'asc'
  ];
}
