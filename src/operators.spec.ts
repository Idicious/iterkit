import { describe, expect, test } from "vitest";
import { catchError, concatMap, filter, map } from "./operators.js";
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
});
