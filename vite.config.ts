import { playwright } from "vite-plus/test/browser-playwright";
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
      entry: ["src/entry/index.js", "src/entry/browser-esm.js"],
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
          environment: "happy-dom",
          setupFiles: ["tests/browser/setup-browser-globals.js"],
          include: ["tests/unit/*.test.js"],
        },
      }),
      defineProject({
        test: {
          name: "browser",
          testTimeout: 60000,
          include: ["tests/browser/*.browser.test.js"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      }),
    ],
  },
});
