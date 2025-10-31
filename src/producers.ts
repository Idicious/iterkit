export function* of<T>(...values: T[]) {
  for (const value of values) {
    yield value;
  }
}

export function from<T>(it: Iterable<T>) {
  return () => it;
}

export function fromPromise<T>(it: Promise<T>) {
  return async function* () {
    yield await it;
  };
}
