import { describe, expect, test } from "vitest";
import { from, fromPromise } from "./producers.js";
import { pipe } from "./pipe.js";
import { catchErrorDefault, filter, map, identity } from "./operators.js";

describe("pipe", () => {
  test("should pipe multiple operators correctly", async () => {
    const gen = (n: number) => [n, n + 1, n + 2, n + 3];
    const isEven = (x: number) => x % 2 === 0;

    const transform = pipe(
      identity<number, [start: number]>(),
      map((n, start) => n + start),
      filter(isEven),
      catchErrorDefault((_) => 0)
    );

    const transformed = transform(gen);

    const result = await Array.fromAsync(transformed(1));
    expect(result).toEqual([2, 4]);
  });

  test("should handle no operators", async () => {
    const generator = fromPromise(Promise.resolve(1));
    const transform = pipe<number>();

    const transformed = transform(generator);

    const result = await Array.fromAsync(transformed());
    expect(result).toEqual([1]);
  });
});
