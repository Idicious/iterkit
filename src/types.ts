export type SyncGenFn<T, TArgs extends unknown[] = []> = (
  ...args: TArgs
) => Iterable<T>;

export type AsyncGenFn<T, TArgs extends unknown[] = []> = (
  ...args: TArgs
) => AsyncIterable<T>;

export type GenFn<T, TArgs extends unknown[] = []> =
  | SyncGenFn<T, TArgs>
  | AsyncGenFn<T, TArgs>;

export type Operator<TInput, TOutput, TArgs extends unknown[] = []> = (
  source: GenFn<TInput, any[]>
) => AsyncGenFn<TOutput, TArgs>;
