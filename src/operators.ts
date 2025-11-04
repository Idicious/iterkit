import { of } from "./producers.js";
import type { GenFn, Operator } from "./types.js";
import { sleep } from "./utils.js";

/**
 * Maps each item emitted by the source generator using the provided function.
 *
 * @example
 * ```ts @import.meta.vitest
 * const { of, map } = await import("iterkit");
 *
 * const source = of(1, 2, 3);
 * const double = map((x) => x * 2);
 *
 * const result = await Array.fromAsync(double(source)());
 * expect(result).toEqual([2, 4, 6]);
 * ```
 *
 * @param fn The mapping function to apply to each item.
 * @returns An operator function that applies the mapping function to each item.
 */
export const map = <T, U, TArgs extends unknown[]>(
  fn: (item: T, ...args: TArgs) => U | Promise<U>
): Operator<T, Awaited<U>, TArgs> => {
  return (source) => {
    return async function* (...args: TArgs) {
      for await (const item of source(...args)) {
        yield await fn(item, ...args);
      }
    };
  };
};

/**
 * Returns the source generator
 *
 * @example
 * ```ts @import.meta.vitest
 * const { of, identity } = await import("iterkit");
 *
 * const source = of(1, 2, 3);
 * const ident = identity();
 *
 * const result = await Array.fromAsync(ident(source)());
 * expect(result).toEqual([1, 2, 3]);
 * ```
 * @returns Source generator
 */
export const identity =
  <T, TArgs extends unknown[] = []>(): Operator<T, T, TArgs> =>
  (source) =>
    source;

/**
 * Filters each item emitted by the source generator using the provided function.
 *
 * @example
 * ```ts @import.meta.vitest
 * const { of, filter } = await import("iterkit");
 *
 * const source = of(1, 2, 3);
 * const isOdd = filter((x) => x % 2 === 1);
 *
 * const result = await Array.fromAsync(isOdd(source)());
 * expect(result).toEqual([1, 3]);
 * ```
 *
 * @param fn The filter function to apply to each item.
 * @returns An operator function that applies the filter function to each item.
 */
export const filter = <T, TArgs extends unknown[]>(
  predicate: (item: T, ...args: TArgs) => boolean | Promise<boolean>
): Operator<T, T, TArgs> => {
  return (source) => {
    return async function* (...args: TArgs) {
      for await (const item of source(...args)) {
        if (await predicate(item, ...args)) {
          yield item;
        }
      }
    };
  };
};

/**
 * Takes the first n items from source generator
 *
 * @example
 * ```ts @import.meta.vitest
 * const { of, take } = await import("iterkit");
 *
 * const source = of(1, 2, 3);
 * const takeTwo = take(2);
 *
 * const result = await Array.fromAsync(takeTwo(source)());
 * expect(result).toEqual([1, 2]);
 * ```
 *
 * @param n Number of items to take.
 * @returns An operator function that takes the first n items.
 */
export const take = <T, TArgs extends unknown[]>(
  n: number
): Operator<T, T, TArgs> => {
  return (source) => {
    return async function* (...args: TArgs) {
      let taken = 0;
      for await (const item of source(...args)) {
        if (taken++ >= n) break;
        yield item;
      }
    };
  };
};

/**
 * Skip the first n items from source generator
 *
 * @example
 * ```ts @import.meta.vitest
 * const { of, skip } = await import("iterkit");
 *
 * const source = of(1, 2, 3);
 * const skipOne = skip(1);
 *
 * const result = await Array.fromAsync(skipOne(source)());
 * expect(result).toEqual([2, 3]);
 * ```
 *
 * @param n Number of items to take.
 * @returns An operator function that takes the first n items.
 */
export const skip = <T, TArgs extends unknown[]>(
  n: number
): Operator<T, T, TArgs> => {
  return (source) => {
    return async function* (...args: TArgs) {
      let skipped = 0;
      for await (const item of source(...args)) {
        if (skipped++ < n) continue;
        yield item;
      }
    };
  };
};

/**
 * Delay emission of each item by ms
 *
 * @example
 * ```ts @import.meta.vitest
 * const { of, delay } = await import("iterkit");
 *
 * const source = of(1, 2, 3);
 * const delay10Ms = delay(10);
 *
 * const result = await Array.fromAsync(delay10Ms(source)());
 * expect(result).toEqual([1, 2, 3]);
 * ```
 *
 * @param ms Number of milliseconds to delay each item.
 * @returns An operator function that delays the emission of each item by the specified milliseconds.
 */
export const delay = <T, TArgs extends unknown[]>(
  ms: number
): Operator<T, T, TArgs> => {
  return (source) =>
    async function* (...args: TArgs) {
      for await (const item of source(...args)) {
        await sleep(ms);
        yield item;
      }
    };
};

/**
 * Maps each item emitted by the source generator to an inner generator and flattens the results.
 *
 * @example
 * ```ts @import.meta.vitest
 * const { of, concatMap } = await import("iterkit");
 *
 * const source = of(1, 2);
 * const expand = concatMap((x) => of(1 * x, 2 * x, 3 * x));
 *
 * const result = await Array.fromAsync(expand(source)());
 * expect(result).toEqual([1, 2, 3, 2, 4, 6]);
 * ```
 * @param fn The function that maps each item to an inner generator.
 * @returns
 */
export const concatMap = <T, U, TArgs extends unknown[]>(
  fn: (item: T, ...args: TArgs) => GenFn<U, TArgs>
): Operator<T, U, TArgs> => {
  return (source) => {
    return async function* (...args: TArgs) {
      for await (const item of source(...args)) {
        yield* fn(item, ...args)(...args);
      }
    };
  };
};

/**
 * Catches errors from the source generator and switches to a backup generator.
 *
 * @example
 * ```ts @import.meta.vitest
 * const { of, throwError, catchError } = await import("iterkit");
 *
 * const source = throwError(new Error("Oops"));
 * const catcher = catchError(() => of(1, 2, 3));
 *
 * const result = await Array.fromAsync(catcher(source)());
 * expect(result).toEqual([1, 2, 3]);
 * ```
 *
 * @param onError Function that returns a backup generator when an error occurs.
 * @returns
 */
export const catchError = <T, TArgs extends unknown[]>(
  onError: (error: unknown, ...args: TArgs) => GenFn<T, TArgs>
): Operator<T, T, TArgs> => {
  return (source) => {
    return async function* (...args: TArgs) {
      try {
        for await (const item of source(...args)) {
          yield item;
        }
      } catch (error: unknown) {
        const backupSource = onError(error, ...args);
        for await (const item of backupSource(...args)) {
          yield item;
        }
      }
    };
  };
};

/**
 * Catches errors from the source generator and returns a default value.
 *
 * @example
 * ```ts @import.meta.vitest
 * const { of, throwError, catchErrorDefault } = await import("iterkit");
 *
 * const source = throwError(new Error("Oops"));
 * const catcher = catchErrorDefault(() => 42);
 *
 * const result = await Array.fromAsync(catcher(source)());
 * expect(result).toEqual([42]);
 * ```
 *
 * @param defaultValue
 * @returns
 */
export const catchErrorDefault = <T, TArgs extends unknown[]>(
  defaultValue: (error: unknown, ...args: TArgs) => T
) => {
  return catchError((error, ...args: TArgs) =>
    of(defaultValue(error, ...args))
  );
};

/**
 * Catches errors from the source generator and retries up to maxRetries times with an optional delay.
 *
 * @example
 * ```ts @import.meta.vitest
 * const { retry } = await import("iterkit");
 *
 * let attempt = 0;
 * const source = function* () {
 *   if (attempt++ < 2) {
 *     throw Error("Temporary failure");
 *   }
 *   yield 1;
 * }

 * const result = await Array.fromAsync(retry(2)(source)());
 * expect(result).toEqual([1]);
 * ```
 *
 * @param maxRetries
 * @param delayMs
 * @returns
 */
export const retry =
  <T, TArgs extends unknown[]>(
    maxRetries = 1,
    delayMs = 0
  ): Operator<T, T, TArgs> =>
  (source) =>
    async function* (...args: TArgs) {
      for (let attempt = 0; ; attempt++) {
        try {
          yield* source(...args);
          return;
        } catch (error) {
          if (attempt >= maxRetries) throw error;
          if (delayMs) await sleep(delayMs);
        }
      }
    };

/**
 * Adds cancellation support to the source generator.
 *
 * @example
 * ```ts @import.meta.vitest
 * const { of, withCancellation, delay } = await import("iterkit");
 *
 * const source = of(1, 2, 3, 4, 5);
 * const delayed = delay(4)(source);
 * const cancellable = withCancellation(delayed);
 *
 * const controller = new AbortController();
 * setTimeout(() => controller.abort(), 15); // Cancel after 15ms
 *
 * const result = await Array.fromAsync(cancellable(controller.signal)());
 *
 * expect(result).toEqual([1, 2, 3]);
 * ```
 *
 * @param source
 * @returns
 */
export const withCancellation = <T, TArgs extends unknown[]>(
  source: GenFn<T, TArgs>
): ((signal: AbortSignal) => GenFn<T, TArgs>) => {
  return (signal: AbortSignal) => {
    return async function* (...args: TArgs) {
      for await (const item of source(...args)) {
        if (signal.aborted) return;
        yield item;
      }
    };
  };
};
