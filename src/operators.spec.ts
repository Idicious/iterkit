import { describe, expect, test } from "vitest";
import {
  catchError,
  concatMap,
  filter,
  map,
  retry,
  take,
  withCancellation,
} from "./operators.js";
import { from, of, throwError } from "./producers.js";

describe("operators", () => {
  test("map", async () => {
    const double = map((x: number) => x * 2);
    const mapped = double(from([1, 2, 3]));

    const result = await Array.fromAsync(mapped());
    expect(result).toEqual([2, 4, 6]);
  });

  test("filter", async () => {
    const isEven = filter((x: number) => x % 2 === 0);
    const filtered = isEven(from([1, 2, 3, 4, 5, 6]));

    const result = await Array.fromAsync(filtered());
    expect(result).toEqual([2, 4, 6]);
  });

  test("filter async", async () => {
    const isEven = filter(async (x: number) => {
      return x % 2 === 0;
    });
    const filtered = isEven(from([1, 2, 3, 4, 5, 6]));

    const result = await Array.fromAsync(filtered());
    expect(result).toEqual([2, 4, 6]);
  });

  test("catchError", async () => {
    const catcher = catchError(() => of(1));
    const caught = catcher(throwError(new Error("Boo")));

    const result = await Array.fromAsync(caught());
    expect(result).toEqual([1]);
  });

  test("concatMap", async () => {
    const source = of(1, 2);
    const expand = concatMap((x: number) => of(1 * x, 2 * x, 3 * x));

    const result = await Array.fromAsync(expand(source)());
    expect(result).toEqual([1, 2, 3, 2, 4, 6]);
  });

  test("take does not pull more items than it emits", async () => {
    const pulled: number[] = [];
    const source = map((x: number) => {
      pulled.push(x);
      return x;
    })(from([1, 2, 3, 4, 5]));

    const result = await Array.fromAsync(take(2)(source)());
    expect(result).toEqual([1, 2]);
    expect(pulled).toEqual([1, 2]);
  });

  test("take(0) does not pull from the source", async () => {
    let pulled = 0;
    const source = function* () {
      while (true) {
        pulled++;
        yield pulled;
      }
    };

    const result = await Array.fromAsync(take(0)(source)());
    expect(result).toEqual([]);
    expect(pulled).toBe(0);
  });

  test("retry does not re-emit items from a failed attempt", async () => {
    let attempt = 0;
    const source = function* () {
      attempt++;
      yield "a";
      if (attempt === 1) throw new Error("Temporary failure");
      yield "b";
      if (attempt === 2) throw new Error("Temporary failure");
      yield "c";
    };

    const result = await Array.fromAsync(retry(2)(source)());
    expect(result).toEqual(["a", "b", "c"]);
    expect(attempt).toBe(3);
  });

  test("retry rethrows once retries are exhausted", async () => {
    const source = function* () {
      yield 1;
      throw new Error("Permanent failure");
    };

    const emitted: number[] = [];
    const run = async () => {
      for await (const item of retry<number>(1)(source)()) emitted.push(item);
    };

    await expect(run()).rejects.toThrow("Permanent failure");
    expect(emitted).toEqual([1]);
  });

  test("withCancellation stops a pending wait on abort", async () => {
    let closed = false;
    const source = async function* () {
      try {
        yield 1;
        await new Promise((r) => setTimeout(r, 1000));
        yield 2;
      } finally {
        closed = true;
      }
    };

    const controller = new AbortController();
    const cancellable = withCancellation(source)(controller.signal);

    const start = Date.now();
    setTimeout(() => controller.abort(), 20);
    const result = await Array.fromAsync(cancellable());

    expect(result).toEqual([1]);
    expect(Date.now() - start).toBeLessThan(500);

    // The source is closed once its in-flight wait settles.
    await new Promise((r) => setTimeout(r, 1100));
    expect(closed).toBe(true);
  });

  test("withCancellation does not pull from the source if already aborted", async () => {
    let pulled = 0;
    const source = function* () {
      while (true) yield ++pulled;
    };

    const controller = new AbortController();
    controller.abort();

    const result = await Array.fromAsync(
      withCancellation(source)(controller.signal)()
    );
    expect(result).toEqual([]);
    expect(pulled).toBe(0);
  });

  test("withCancellation closes the source when aborted between items", async () => {
    let closed = false;
    const source = function* () {
      try {
        for (let i = 1; ; i++) yield i;
      } finally {
        closed = true;
      }
    };

    const controller = new AbortController();
    const results: number[] = [];
    for await (const value of withCancellation(source)(controller.signal)()) {
      results.push(value);
      if (value === 2) controller.abort();
    }

    expect(results).toEqual([1, 2]);
    expect(closed).toBe(true);
  });
});
