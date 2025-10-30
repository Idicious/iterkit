export type SyncGenFn<TReturn, TArgs extends unknown[]> = (
  ...args: TArgs
) => Iterable<TReturn>;

export type AsyncGenFn<TReturn, TArgs extends unknown[]> = (
  ...args: TArgs
) => AsyncIterable<TReturn>;

export type GenFn<TReturn, TArgs extends unknown[]> =
  | SyncGenFn<TReturn, TArgs>
  | AsyncGenFn<TReturn, TArgs>;

export type Operator<TInput, TOutput, TArgs extends unknown[]> = (
  source: GenFn<TInput, any[]>
) => AsyncGenFn<TOutput, TArgs>;
