import path from "node:path";
import { describe, expect, test } from "vitest";
import { loadFixtureCases } from "./helpers/fixtures.js";
import { runFixture } from "./helpers/processing.js";

const unitRoot = path.resolve(process.cwd(), "tests/unit/fixtures");
const fixtures = loadFixtureCases(unitRoot);

describe("legacy PDE unit fixtures", () => {
  test.each(fixtures)("$name", ({ filePath }) => {
    expect(() => runFixture(filePath)).not.toThrow();
  });
});
