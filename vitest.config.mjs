import { defineConfig } from "vitest/config";
import { doctest } from "vite-plugin-doctest";

export default defineConfig({
  plugins: [doctest()],
  typecheck: {
    tsconfig: "./tsconfig.spec.json",
  },
  test: {
    includeSource: ["./src/**/*.ts", "**/*.md"],
  },
});
