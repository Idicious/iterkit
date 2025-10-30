import { afterEach, describe, expect, test } from "vitest";
import nock from "nock";
import { filter, map } from "./operators.js";
import { from } from "./producers.js";
import { pipe } from "./pipe.js";

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
});

type Post = { id: number; title: string };

describe("fetch test", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test("should map fetch responses to JSON", async () => {
    const baseUrl = "http://localhost";

    const scope = nock(baseUrl)
      .get("/posts/1")
      .reply(200, { id: 1, title: "Post 1" })
      .get("/posts/2")
      .reply(200, { id: 2, title: "Post 2" });

    const fetchAndParse = pipe(
      map((id: string) => fetch(new URL(`/posts/${id}`, baseUrl))),
      map((response) => response.json() as Promise<Post>)
    );

    const execute = fetchAndParse(from(["1", "2"]));
    const result = await Array.fromAsync(execute());

    expect(result).toEqual([
      expect.objectContaining({ id: 1 }),
      expect.objectContaining({ id: 2 }),
    ]);

    scope.done();
  });
});
