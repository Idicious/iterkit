import { defineConfig } from "vitest/config";
import { doctest } from "vite-plugin-doctest";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    doctest({}),
    tsConfigPaths({ configNames: ["tsconfig.spec.json"] }),
  ],
  typecheck: {
    tsconfig: "./tsconfig.spec.json",
  },
  test: {
    includeSource: ["./src/**/*.[jt]s?(x)"],
  },
});
