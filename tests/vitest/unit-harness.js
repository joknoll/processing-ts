import fs from "node:fs";
import path from "node:path";

import Browser from "../../lib/Browser.js";
import testHarness from "../../lib/TestHarness.js";
import { createProcessing } from "../../src/entry/index.js";

const Processing = createProcessing(Browser, testHarness);

function compileFixture(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  return Processing.compile(source);
}

function runUnitFixture(filePath, options = {}) {
  const canvas = Browser.document.createElement("canvas");
  const source = fs.readFileSync(filePath, "utf8");
  const rootDir = options.rootDir ?? path.resolve(process.cwd(), "test/unit");
  const testName = path.relative(rootDir, filePath);

  testHarness.prep(testName);

  let sketch;
  try {
    sketch = new Processing(canvas, source, testHarness);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`${testName} could not build: ${reason}`);
  }

  if (sketch._failCount > 0) {
    throw new Error(`${testName} reported ${sketch._failCount} failed checks`);
  }

  return sketch;
}

export { compileFixture, runUnitFixture };
