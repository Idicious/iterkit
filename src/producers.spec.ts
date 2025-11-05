import { beforeAll, describe, expect, it, vi } from "vitest";
import { delay } from "./operators.js";
import { merge, of } from "./producers.js";

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
  });
});
