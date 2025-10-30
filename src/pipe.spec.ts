import { describe, expect, test } from "vitest";
import { from } from "./producers.js";
import { pipe } from "./pipe.js";
import { catchErrorDefault, filter, map } from "./operators.js";

describe("pipe", () => {
  test("should pipe multiple operators correctly", async () => {
    function* gen(n: number) {
      yield* from(n, n + 1, n + 2);
    }

    const isEven = (x: number) => x % 2 === 0;

    const transform = pipe(
      map((n: number, ..._args: [start: number]) => n + 1),
      filter(isEven),
      catchErrorDefault((_, n) => n)
    );

    const transformed = transform(gen);

    const result = await Array.fromAsync(transformed(1));
    expect(result).toEqual([2, 4]);
  });
});
