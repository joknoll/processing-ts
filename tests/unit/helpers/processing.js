import path from "node:path";

import testHarness from "../../../lib/TestHarness.js";
import { createProcessing } from "../../../src/entry/index.ts";
import { readFixture } from "./fixtures.js";
import { getSharedTestBrowser } from "./test-browser.js";

const Browser = getSharedTestBrowser();
const defaultProcessing = createProcessing(Browser, testHarness);

function createTestProcessing(options = {}) {
  if (!options.Browser && !options.testHarness) {
    return defaultProcessing;
  }

  const browser = options.Browser ?? Browser;
  const harness = options.testHarness ?? testHarness;
  return createProcessing(browser, harness);
}

function compileSource(source, options = {}) {
  const Processing = options.Processing ?? createTestProcessing(options);
  return Processing.compile(source);
}

function compileFixture(filePath, options = {}) {
  return compileSource(readFixture(filePath), options);
}

function instantiateSketch(source, options = {}) {
  const browser = options.Browser ?? Browser;
  const harness = options.testHarness ?? testHarness;
  const Processing = options.Processing ?? createTestProcessing(options);
  const canvas = options.canvas ?? browser.document.createElement("canvas");
  const testName = options.testName ?? "inline sketch";

  harness.prep(testName);

  let sketch;
  try {
    sketch = new Processing(canvas, source, harness);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`${testName} could not build: ${reason}`);
  }

  if (sketch._failCount > 0) {
    throw new Error(`${testName} reported ${sketch._failCount} failed checks`);
  }

  return sketch;
}

function runFixture(filePath, options = {}) {
  const rootDir = options.rootDir ?? path.resolve(process.cwd(), "tests/unit");
  const testName = path.relative(rootDir, filePath).split(path.sep).join("/");
  return instantiateSketch(readFixture(filePath), { ...options, testName });
}

export { compileFixture, compileSource, createTestProcessing, instantiateSketch, runFixture };
