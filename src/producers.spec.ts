import { beforeAll, describe, expect, it, vi } from "vitest";
import { delay, take } from "./operators.js";
import { merge, of, throwError } from "./producers.js";

describe("producers", () => {
  beforeAll(() => vi.useFakeTimers());

  describe("merge", () => {
    it("should merge multiple generators", async () => {
      const gen1 = of(1, 2, 3);
      const gen2 = of(4, 5, 6);
      const merged = merge(gen1, gen2);

      const result = await Array.fromAsync(merged());
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should merge correctly with delays", async () => {
      const source1 = delay<string>(10)(of("a", "b", "c"));
      const source2 = delay<number>(5)(of(1, 2, 3));
      const merged = merge(source1, source2);

      const resultP = Array.fromAsync(merged());
      await vi.runAllTimersAsync();

      expect(await resultP).toEqual([1, "a", 2, 3, "b", "c"]);
    });

    it("should close all sources when the consumer stops early", async () => {
      const closed: string[] = [];
      const infinite = (name: string) =>
        function* () {
          try {
            for (let i = 0; ; i++) yield `${name}${i}`;
          } finally {
            closed.push(name);
          }
        };
      const merged = merge(infinite("a"), infinite("b"));

      const result = await Array.fromAsync(take(3)(merged)());
      expect(result).toHaveLength(3);
      expect(closed.sort()).toEqual(["a", "b"]);
    });

    it("should close async sources when the consumer stops early", async () => {
      const closed: string[] = [];
      const ticker = (name: string) =>
        async function* () {
          try {
            for (let i = 0; ; i++) {
              await new Promise((r) => setTimeout(r, 5));
              yield `${name}${i}`;
            }
          } finally {
            closed.push(name);
          }
        };
      const merged = merge(ticker("a"), ticker("b"));

      const resultP = Array.fromAsync(take(3)(merged)());
      await vi.runAllTimersAsync();
      expect(await resultP).toHaveLength(3);

      await vi.runAllTimersAsync();
      expect(closed.sort()).toEqual(["a", "b"]);
    });

    it("should close the other sources when one source throws", async () => {
      const closed: string[] = [];
      const infinite = function* () {
        try {
          for (let i = 0; ; i++) yield i;
        } finally {
          closed.push("infinite");
        }
      };
      const merged = merge(throwError(new Error("Boom")), infinite);

      await expect(Array.fromAsync(merged())).rejects.toThrow("Boom");
      expect(closed).toEqual(["infinite"]);
    });
  });

  describe("throwError", () => {
    beforeAll(() => vi.useRealTimers());

    it("should not reject until the generator is run", async () => {
      const source = throwError(new Error("Lazy"));
      // An eager rejection here would surface as an unhandled rejection.
      await new Promise((r) => setTimeout(r, 10));

      await expect(Array.fromAsync(source())).rejects.toThrow("Lazy");
    });

    it("should throw on every run", async () => {
      const source = throwError(new Error("Again"));

      await expect(Array.fromAsync(source())).rejects.toThrow("Again");
      await expect(Array.fromAsync(source())).rejects.toThrow("Again");
    });
  });
});
