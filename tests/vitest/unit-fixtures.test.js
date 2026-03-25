import path from "node:path";
import { describe, expect, test } from "vitest";
import { loadFixturePaths } from "./fixture-loader.js";
import { runUnitFixture } from "./unit-harness.js";

const unitRoot = path.resolve(process.cwd(), "tests/unit");
const fixtures = loadFixturePaths(unitRoot).map((filePath) => ({
  filePath,
  name: path.relative(unitRoot, filePath),
}));

describe("legacy PDE unit fixtures", () => {
  test.each(fixtures)("$name", ({ filePath }) => {
    expect(() => runUnitFixture(filePath)).not.toThrow();
  });
});
