import { beforeAll, afterAll, afterEach } from "vitest";
import nock from "nock";
import fs from "node:fs";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

// Patch Markdown loading globally before doctest parses anything
const origReadFileSync = fs.readFileSync;
fs.readFileSync = function (file, ...args) {
  let content = origReadFileSync.call(this, file, ...args);

  // Only transform Markdown files
  if (typeof file === "string" && file.endsWith(".md")) {
    // Replace normal TS/JS fences with doctest ones for vite-plugin-doctest
    content = content
      .replace(/```ts$/g, "```ts @import.meta.vitest")
      .replace(/```typescript$/g, "```typescript @import.meta.vitest")
      .replace(/```js$/g, "```js @import.meta.vitest")
      .replace(/```javascript$/g, "```javascript @import.meta.vitest");
  }

  return content;
};
