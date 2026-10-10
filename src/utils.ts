export const sleep = (ms: number) =>
  new Promise<void>((r) => setTimeout(r, ms));

/** Gets an iterator from a sync or async iterable. */
export const toIterator = <T>(
  iterable: Iterable<T> | AsyncIterable<T>
): Iterator<T> | AsyncIterator<T> =>
  Symbol.asyncIterator in iterable
    ? iterable[Symbol.asyncIterator]()
    : iterable[Symbol.iterator]();
