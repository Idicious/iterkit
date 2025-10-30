export function* identity<T>(value: T): Iterable<T> {
  yield value;
}

export function from<T>(it: Iterable<T>) {
  return () => it;
}

export function fromPromise<T>(it: Promise<T>) {
  return async function* () {
    yield await it;
  };
}
