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
