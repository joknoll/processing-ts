import path from "node:path";
import { describe, expect, test } from "vitest";
import { loadFixtureCases } from "./helpers/fixtures.js";
import { runFixture } from "./helpers/processing.js";

const codeExamplesRoot = path.resolve(process.cwd(), "tests/code-examples");
const fixtures = loadFixtureCases(codeExamplesRoot);

describe("code examples", () => {
  test.each(fixtures)("$name", ({ filePath }) => {
    let sketch;

    expect(() => {
      sketch = runFixture(filePath, { rootDir: codeExamplesRoot });
    }).not.toThrow();

    sketch?.exit?.();
  });
});
