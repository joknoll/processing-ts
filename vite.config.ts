import { playwright } from "@vitest/browser-playwright";
import { defineConfig, defineProject } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},

  pack: [
    {
      entry: ["src/entry/index.js"],
      format: ["esm"],
      dts: false,
      clean: true,
      platform: "neutral",
      target: false,
      minify: true,
      report: { brotli: true },
    },
    {
      entry: {
        processing: "./src/entry/browser.js",
      },
      platform: "browser",
      format: ["iife"],
      dts: false,
      minify: true,
      clean: false,
    },
  ],
  test: {
    testTimeout: 30000,
    projects: [
      defineProject({
        test: {
          name: "unit",
          environment: "node",
          setupFiles: ["tests/vitest/setup-browser-globals.js"],
          include: [
            "tests/vitest/unit-fixtures.test.js",
            "tests/vitest/parser-fixtures.test.js",
            "tests/vitest/logger.test.js",
            "tests/vitest/code-examples.test.js",
          ],
        },
      }),
      defineProject({
        test: {
          name: "browser",
          include: ["tests/vitest/*.browser.test.js"],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: "chromium" }],
            viewport: {
              width: 800,
              height: 600,
            },
          },
        },
      }),
      defineProject({
        test: {
          name: "bench",
          environment: "node",
          setupFiles: ["tests/vitest/setup-browser-globals.js"],
          include: ["bench/**/*.bench.js"],
          benchmark: {
            include: ["bench/**/*.bench.js"],
          },
        },
      }),
    ],
  },
});
