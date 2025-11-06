import type { GenFn } from "./types.js";

/**
 * Creates a synchronous generator function from a list of values.
 *
 * @example
 * ```ts @import.meta.vitest
 * const { of } = await import("iterkit");
 *
 * const source = of(1, 2, 3);
 * const result = await Array.fromAsync(source());
 *
 * expect(result).toEqual([1, 2, 3]);
 * ```
 *
 * @param values The values to include in the generator.
 * @returns A generator function that yields the provided values.
 */
export function of<T>(...values: T[]): GenFn<T> {
  return () => values;
}

/**
 * Creates a synchronous generator function from an iterable.
 * Examples of iterables include arrays, sets, and maps.
 *
 * @example
 * ```ts @import.meta.vitest
 * const { from } = await import("iterkit");
 *
 * const source = from(new Set([1, 1, 2, 2, 3, 3, 3]));
 * const result = await Array.fromAsync(source());
 *
 * expect(result).toEqual([1, 2, 3]);
 * ```
 *
 * @example
 * ```ts @import.meta.vitest
 * const { from } = await import("iterkit");
 *
 * const source = from(new Map([[1, "a"], [2, "b"], [3, "c"]]));
 * const result = await Array.fromAsync(source());
 *
 * expect(result).toEqual([[1, "a"], [2, "b"], [3, "c"]]);
 * ```
 *
 * @example
 * ```ts @import.meta.vitest
 * const { from } = await import("iterkit");
 *
 * const source = from([1, 2, 3]);
 * const result = await Array.fromAsync(source());
 *
 * expect(result).toEqual([1, 2, 3]);
 * ```
 *
 * @param it The iterable to convert into a generator.
 * @returns A generator function that yields the values from the iterable.
 */
export function from<T>(it: Iterable<T>): GenFn<T> {
  return () => it;
}

/**
 * Creates an async generator function from a promise.
 *
 * @example
 * ```ts @import.meta.vitest
 * const { fromPromise } = await import("iterkit");
 *
 * const source = fromPromise(Promise.resolve(42));
 * const result = await Array.fromAsync(source());
 *
 * expect(result).toEqual([42]);
 * ```
 *
 * @param it The promise to convert into a generator.
 * @returns A generator function that yields the resolved value of the promise.
 */
export function fromPromise<T>(it: Promise<T>): GenFn<T> {
  return async function* () {
    yield await it;
  };
}

/**
 * Creates an async generator function that throws an error.
 *
 * @example
 * ```ts @import.meta.vitest
 * const { throwError } = await import("iterkit");
 *
 * const source = throwError(new Error("Test error"));
 * const resultP = Array.fromAsync(source());
 *
 * expect(resultP).rejects.toThrow("Test error");
 * ```
 *
 * @param err The error to throw.
 * @returns A generator function that throws the provided error.
 */
export function throwError(err: unknown): GenFn<never> {
  return fromPromise(Promise.reject(err));
}

/**
 * Merges multiple generator functions into a single generator function.
 *
 * @example
 * ```ts @import.meta.vitest
 * const { merge, of } = await import("iterkit");
 *
 * const source1 = of(1, 2, 3);
 * const source2 = of(4, 5, 6);
 * const merged = merge(source1, source2);
 *
 * const result = await Array.fromAsync(merged());
 *
 * expect(result).toEqual([1, 2, 3, 4, 5, 6]);
 * ```
 *
 * @param generators The generator functions to merge.
 * @returns A generator function that yields values from all provided generators.
 */
export function merge<const T extends readonly GenFn<any>[]>(
  ...generators: T
): GenFn<T extends readonly GenFn<infer U>[] ? Awaited<U> : never> {
  return async function* () {
    const iterators = generators.map((generator) => {
      const iterable = generator();

      return Symbol.asyncIterator in iterable
        ? iterable[Symbol.asyncIterator]()
        : iterable[Symbol.iterator]();
    });

    const actives = iterators.map((iterator) => ({
      iterator,
      pending: Promise.resolve(iterator.next()),
    }));

    while (actives.length) {
      const { index, result } = await Promise.race(
        actives.map((active, index) =>
          active.pending.then((result) => ({ index, result }))
        )
      );

      const active = actives[index]!;

      if (result.done) {
        actives.splice(index, 1);
        continue;
      } else {
        active.pending = Promise.resolve(active.iterator.next());
        yield result.value;
      }
    }
  };
}
