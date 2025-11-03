export type GenFn<T, TArgs extends unknown[] = []> = (
  ...args: TArgs
) => Iterable<T> | AsyncIterable<T>;

export type Operator<TIn, TOut, TArgs extends unknown[] = []> = (
  source: GenFn<TIn, any[]>
) => GenFn<TOut, TArgs>;
