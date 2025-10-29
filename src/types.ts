export type AsyncGenFn<TReturn, TArgs extends unknown[]> = (
  ...args: TArgs
) => AsyncIterable<TReturn>;
export type Operator<TInput, TOutput, TArgs extends unknown[]> = (
  source: AsyncGenFn<TInput, TArgs>
) => AsyncGenFn<TOutput, TArgs>;
