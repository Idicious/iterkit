import type { GenFn } from "./types.js";

export function of<T>(...values: T[]): GenFn<T> {
  return () => values;
}

export function from<T>(it: Iterable<T>): GenFn<T> {
  return () => it;
}

export function fromPromise<T>(it: Promise<T>): GenFn<T> {
  return async function* () {
    yield await it;
  };
}

export function throwError(err: unknown): GenFn<never> {
  return fromPromise(Promise.reject(err));
}
