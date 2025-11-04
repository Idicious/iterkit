import { defineConfig } from "vitest/config";
import { doctest } from "vite-plugin-doctest";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [doctest()],
  typecheck: {
    tsconfig: "./tsconfig.spec.json",
  },
  test: {
    includeSource: ["./src/**/*.ts", "**/*.md"],
    setupFiles: "./vitest.setup.mjs",
  },
  resolve: {
    alias: {
      iterkit: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
    },
  },
});
