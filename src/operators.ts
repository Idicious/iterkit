import { of } from "./producers.js";
import type { GenFn, Operator } from "./types.js";
import { sleep } from "./utils.js";

export const map = <T, U, TArgs extends unknown[]>(
  fn: (item: T, ...args: TArgs) => U
): Operator<T, Awaited<U>, TArgs> => {
  return (source) => {
    return async function* (...args: TArgs) {
      for await (const item of source(...args)) {
        yield await fn(item, ...args);
      }
    };
  };
};

export const identity =
  <T, TArgs extends unknown[] = []>(): Operator<T, T, TArgs> =>
  (source) =>
    source;

export const filter = <T, TArgs extends unknown[]>(
  predicate: (item: T, ...args: TArgs) => boolean | Promise<boolean>
): Operator<T, T, TArgs> => {
  return (source) => {
    return async function* (...args: TArgs) {
      for await (const item of source(...args)) {
        if (predicate(item, ...args)) {
          yield item;
        }
      }
    };
  };
};

export const take = <T, TArgs extends unknown[]>(
  count: number
): Operator<T, T, TArgs> => {
  return (source) => {
    return async function* (...args: TArgs) {
      let taken = 0;
      for await (const item of source(...args)) {
        if (taken++ >= count) break;
        yield item;
      }
    };
  };
};

export const skip = <T, TArgs extends unknown[]>(
  count: number
): Operator<T, T, TArgs> => {
  return (source) => {
    return async function* (...args: TArgs) {
      let skipped = 0;
      for await (const item of source(...args)) {
        if (skipped++ < count) continue;
        yield item;
      }
    };
  };
};

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

export const concatMap = <T, U, TArgs extends unknown[]>(
  fn: (item: T, ...args: TArgs) => AsyncIterable<U> | Iterable<U>
): Operator<T, U, TArgs> => {
  return (source) => {
    return async function* (...args: TArgs) {
      for await (const item of source(...args)) {
        yield* fn(item, ...args);
      }
    };
  };
};

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

export const catchErrorDefault = <T, TArgs extends unknown[]>(
  defaultValue: (error: unknown, ...args: TArgs) => T
) => {
  return catchError((error, ...args: TArgs) =>
    of(defaultValue(error, ...args))
  );
};

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

export const throwError = <T, TArgs extends unknown[]>(
  fn: (...args: TArgs) => Error
): Operator<T, T, TArgs> => {
  return () => {
    return async function* (...args: TArgs) {
      throw fn(...args);
    };
  };
};

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
