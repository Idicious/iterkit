export function* identity<T>(value: T): Iterable<T> {
  yield value;
}

export function* from<T>(...args: T[]): Iterable<T> {
  for (const item of args) {
    yield item;
  }
}
