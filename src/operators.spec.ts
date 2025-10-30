import { describe, expect, test } from "vitest";
import { filter, map } from "./operators.js";
import { from } from "./producers.js";

describe("operators", () => {
  test("map", async () => {
    const double = map((x: number) => x * 2);
    const mapped = double(() => from(1, 2, 3));

    const result = await Array.fromAsync(mapped());
    expect(result).toEqual([2, 4, 6]);
  });

  test("filter", async () => {
    const isEven = filter((x: number) => x % 2 === 0);
    const filtered = isEven(() => from(1, 2, 3, 4, 5, 6));

    const result = await Array.fromAsync(filtered());
    expect(result).toEqual([2, 4, 6]);
  });
});
