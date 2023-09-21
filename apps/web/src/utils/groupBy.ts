export function groupBy<K, V>(values: Array<V>, iteratee: (value: V) => K) {
  return values.reduce((map, value) => {
    const key = iteratee(value);
    if (map.has(key)) {
      map.get(key)?.push(value);
    } else {
      map.set(key, [value]);
    }
    return map;
  }, new Map<K, Array<V>>());
}
