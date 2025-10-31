import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { pipe } from "./pipe.js";
import { map, skip, take, type } from "./operators.js";
import { from } from "./producers.js";

type Post = { id: number; title: string };

describe("integration:fetch", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());

  afterEach(() => nock.cleanAll());

  test("should map fetch responses to JSON", async () => {
    const baseUrl = "http://localhost";
    const accountId = "account-id";

    const scope = nock(baseUrl)
      .matchHeader("x-account-id", accountId)
      .get("/posts/2")
      .reply(200, { id: 2, title: "Post 2" });

    const fetchAndParse = pipe(
      type<string, [string]>(),
      skip(1),
      take(1),
      map((id, accountId) =>
        fetch(new URL(`/posts/${id}`, baseUrl), {
          headers: {
            "x-account-id": accountId,
          },
        })
      ),
      map((res) => res.json() as Promise<Post>)
    );

    const fetchForAccount = fetchAndParse(from(["1", "2", "3"]));
    const result = await Array.fromAsync(fetchForAccount(accountId));

    expect(result).toEqual([expect.objectContaining({ id: 2 })]);

    scope.done();
  });
});
