declare global {
  interface Array<T> {
    // Allows to have `filter(Boolean)` as a type guard
    filter<S extends T>(
      predicate: BooleanConstructor,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      thisArg?: any
    ): Exclude<S, false | null | undefined | 0 | ''>[];
  }
}

export {};
