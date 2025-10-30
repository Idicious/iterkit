import { describe, expect, test } from "vitest";
import { from } from "./producers.js";
import { pipe } from "./pipe.js";
import { catchErrorDefault, filter, map } from "./operators.js";

describe("pipe", () => {
  test("should pipe multiple operators correctly", async () => {
    function* gen(n: number) {
      yield* from(n, n + 1, n + 2);
    }

    const piped = pipe(
      gen,
      map((x) => x + 1),
      filter((x) => x % 2 === 0),
      catchErrorDefault((_, n) => n)
    );

    const result = await Array.fromAsync(piped(1));
    expect(result).toEqual([2, 4]);
  });
});
