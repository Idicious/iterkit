import { expect, test, beforeAll, vi, describe } from "vitest";
import { catchErrorDefault, delay, filter, map } from "./operators.js";
import { from } from "./producers.js";
import { pipe } from "./pipe.js";

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

beforeAll(() => {
  vi.useFakeTimers();
});

test("map operator", async () => {
  const source = from(1, 2, 3);

  const mapped = pipe(
    (_n: number) => source,
    map((x) => x * 2),
    delay(1000),
    catchErrorDefault((_, n) => n)
  );

  const result = Array.fromAsync(mapped(10));
  await vi.runAllTimersAsync();

  await expect(result).resolves.toEqual([2, 4, 6]);
});
