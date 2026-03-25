import path from "node:path";
import { describe, expect, test } from "vite-plus/test";
import { loadFixtureCases } from "./helpers/fixtures.js";
import { runFixture } from "./helpers/processing.js";

const unitRoot = path.resolve(process.cwd(), "tests/unit/fixtures");
const strictParserFixtures = new Set([
  "svgShape1.pde",
  "XMLElement/P52.0/XMLAddChild.pde",
  "XMLElement/P52.0/XMLAttribute/XMLAttributeGet.pde",
  "XMLElement/P52.0/XMLAttribute/XMLAttributeRemove.pde",
  "XMLElement/P52.0/XMLAttribute/XMLAttributeSet.pde",
  "XMLElement/P52.0/XMLConstructor.pde",
  "XMLElement/P52.0/XMLEquals.pde",
  "XMLElement/P52.0/XMLGetChild.pde",
  "XMLElement/P52.0/XMLGetChildNS.pde",
  "XMLElement/P52.0/XMLInsertChild.pde",
  "XMLElement/P52.0/XMLRemoveChild.pde",
  "XMLElement/P52.0/XMLRemoveChildAtIndex.pde",
  "XMLElement/P52.0/XMLgetChildCount.pde",
  "XMLElement/P52.0/XMLgetContent.pde",
  "XMLElement/P52.0/XMLtoString.pde",
  "XMLElement/P52.0/parseXML.pde",
  "XMLElement/XMLAttribute/XMLAttributeGet.pde",
  "XMLElement/XMLAttribute/XMLAttributeRemove.pde",
  "XMLElement/XMLAttribute/XMLAttributeSet.pde",
  "XMLElement/XMLElementAddChild.pde",
  "XMLElement/XMLElementEquals.pde",
  "XMLElement/XMLElementGeFloat.pde",
  "XMLElement/XMLElementGetChild.pde",
  "XMLElement/XMLElementGetChildNS.pde",
  "XMLElement/XMLElementGetFloat.pde",
  "XMLElement/XMLElementGetInt.pde",
  "XMLElement/XMLElementGetName.pde",
  "XMLElement/XMLElementGetString.pde",
  "XMLElement/XMLElementInsertChild.pde",
  "XMLElement/XMLElementParse.pde",
  "XMLElement/XMLElementRemoveChild.pde",
  "XMLElement/XMLElementRemoveChildAtIndex.pde",
  "XMLElement/XMLElementWithCDATA.pde",
  "XMLElement/XMLElementgetChildCount.pde",
  "XMLElement/XMLElementgetContent.pde",
]);
const fixtures = loadFixtureCases(unitRoot).filter(({ name }) => !strictParserFixtures.has(name));

describe("legacy PDE unit fixtures", () => {
  test.each(fixtures)("$name", ({ filePath }) => {
    expect(() => runFixture(filePath)).not.toThrow();
  });
});
