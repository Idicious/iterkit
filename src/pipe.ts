import type { AsyncGenFn, Operator, GenFn } from "./types.js";

export function pipe<A, R, TArgs extends unknown[]>(
  source: GenFn<A, TArgs>,
  operator1: Operator<A, R, TArgs>
): AsyncGenFn<R, TArgs>;
export function pipe<A, B, R, TArgs extends unknown[]>(
  source: GenFn<A, TArgs>,
  operator1: Operator<A, B, TArgs>,
  operator2: Operator<B, R, TArgs>
): AsyncGenFn<R, TArgs>;
export function pipe<A, B, C, R, TArgs extends unknown[]>(
  source: GenFn<A, TArgs>,
  operator1: Operator<A, B, TArgs>,
  operator2: Operator<B, C, TArgs>,
  operator3: Operator<C, R, TArgs>
): AsyncGenFn<R, TArgs>;
export function pipe<A, B, C, D, R, TArgs extends unknown[]>(
  source: GenFn<A, TArgs>,
  operator1: Operator<A, B, TArgs>,
  operator2: Operator<B, C, TArgs>,
  operator3: Operator<C, D, TArgs>,
  operator4: Operator<D, R, TArgs>
): AsyncGenFn<R, TArgs>;
export function pipe<A, B, C, D, E, R, TArgs extends unknown[]>(
  source: GenFn<A, TArgs>,
  operator1: Operator<A, B, TArgs>,
  operator2: Operator<B, C, TArgs>,
  operator3: Operator<C, D, TArgs>,
  operator4: Operator<D, E, TArgs>,
  operator5: Operator<E, R, TArgs>
): AsyncGenFn<R, TArgs>;
export function pipe(
  source: GenFn<unknown, unknown[]>,
  ...operators: Operator<unknown, unknown, unknown[]>[]
): AsyncGenFn<unknown, unknown[]> {
  return operators.reduce(
    (prevSource, operator) => operator(prevSource),
    source as AsyncGenFn<unknown, unknown[]>
  );
}
