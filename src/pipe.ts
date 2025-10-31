import type { Operator } from "./types.js";

export function pipe<A, TArgs extends unknown[] = []>(): Operator<A, A, TArgs>;
export function pipe<A, R, TArgs extends unknown[] = []>(
  operator1: Operator<A, R, TArgs>
): Operator<A, R, TArgs>;
export function pipe<A, B, R, TArgs extends unknown[] = []>(
  operator1: Operator<A, B, TArgs>,
  operator2: Operator<B, R, TArgs>
): Operator<A, R, TArgs>;
export function pipe<A, B, C, R, TArgs extends unknown[] = []>(
  operator1: Operator<A, B, TArgs>,
  operator2: Operator<B, C, TArgs>,
  operator3: Operator<C, R, TArgs>
): Operator<A, R, TArgs>;
export function pipe<A, B, C, D, R, TArgs extends unknown[] = []>(
  operator1: Operator<A, B, TArgs>,
  operator2: Operator<B, C, TArgs>,
  operator3: Operator<C, D, TArgs>,
  operator4: Operator<D, R, TArgs>
): Operator<A, R, TArgs>;
export function pipe<A, B, C, D, E, R, TArgs extends unknown[] = []>(
  operator1: Operator<A, B, TArgs>,
  operator2: Operator<B, C, TArgs>,
  operator3: Operator<C, D, TArgs>,
  operator4: Operator<D, E, TArgs>,
  operator5: Operator<E, R, TArgs>
): Operator<A, R, TArgs>;
export function pipe<A, R, TArgs extends unknown[] = []>(
  ...operators: Operator<any, any, any[]>[]
): Operator<A, R, TArgs> {
  return (source) =>
    operators.reduce((prevSource, operator) => operator(prevSource), source);
}
