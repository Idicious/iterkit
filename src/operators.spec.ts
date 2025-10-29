import { expect, test } from "vitest";
import { map, takeAll } from "./operators.js";

test("map operator", async () => {
  const source = async function* () {
    yield 1;
    yield 2;
    yield 3;
  };

  const mapped = map((x: number) => x * 2)(source);

  expect(await takeAll(mapped())).toEqual([2, 4, 6]);
});
