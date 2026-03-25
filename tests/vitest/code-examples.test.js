import path from "node:path";
import { describe, expect, test } from "vitest";
import { loadFixturePaths } from "./fixture-loader.js";
import { runUnitFixture } from "./unit-harness.js";

const codeExamplesRoot = path.resolve(process.cwd(), "tests/code-examples");
const fixtures = loadFixturePaths(codeExamplesRoot).map((filePath) => ({
  filePath,
  name: path.relative(codeExamplesRoot, filePath),
}));

describe("code examples", () => {
  test.each(fixtures)("$name", ({ filePath }) => {
    let sketch;

    expect(() => {
      sketch = runUnitFixture(filePath, { rootDir: codeExamplesRoot });
    }).not.toThrow();

    sketch?.exit?.();
  });
});
