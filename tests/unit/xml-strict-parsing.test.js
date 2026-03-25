import path from "node:path";
import { describe, expect, test } from "vite-plus/test";

import XMLAttributeFactory from "../../src/Objects/XMLAttribute.js";
import XMLElementFactory from "../../src/Objects/XMLElement.js";
import { runFixture } from "./helpers/processing.js";
import { getSharedTestBrowser } from "./helpers/test-browser.js";

const Browser = getSharedTestBrowser();
const XMLAttribute = XMLAttributeFactory();
const XMLElement = XMLElementFactory({ Browser, XMLAttribute });

describe("XMLElement strict parsing", () => {
  test("treats Processing's single-quoted XML declaration fixture as a parser error", () => {
    const sites = [
      "<?xml version='1.0'?>",
      "<websites>",
      "  <site id='0' url='processing.org'>Processing</site>",
      "  <site id='1' url='mobile.processing.org'>Processing Mobile</site>",
      "</websites>",
    ].join("");

    const root = XMLElement.parse(sites);

    expect(root.toString()).toContain("<PARSERERROR");
    expect(root.getChildCount()).toBe(1);
    expect(root.getChild(0).toString()).toContain("Malformed declaration expecting version");
  });

  test("preserves parsererror nodes for malformed markup instead of silently recovering", () => {
    const root = XMLElement.parse("<top><first id='abc'></first><top>");

    expect(root.getChildCount()).toBe(3);
    expect(root.getChild(0).toString()).toContain("<PARSERERROR");
    expect(root.getChild(1).toString()).toBe('<first ="null"/>');
  });

  test("surfaces parsererror output for the legacy CDATA fixture", () => {
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      "<content>",
      `    <title><![CDATA[The "<Battle lol='cat'>" of t' Brooklyn]]></title>`,
      "</content>",
    ].join("");

    const root = XMLElement.parse(xml);

    expect(root.getChildCount()).toBe(2);
    expect(root.getChild(0).toString()).toContain("<PARSERERROR");
    expect(root.getChild(1).toString()).toBe("<title/>");
  });
});

describe("SVG strict parsing", () => {
  test("rejects the legacy svgShape fixture under the stricter DOMParser/XHR path", () => {
    const filePath = path.resolve(process.cwd(), "tests/unit/fixtures/svgShape1.pde");

    expect(() => runFixture(filePath)).toThrow(/replace/);
  });

  test("parses the SVG string with happy-dom's normalized attribute model", () => {
    const root = XMLElement.parse(
      "<svg xmlns='http://www.w3.org/2000/svg' width='819' height='819'><g><path d='M35,25 L256,10' /></g></svg>",
    );

    expect(root.toString()).toBe('<svg ="null" ="null" ="null"><g><path ="null"/></g></svg>');
    expect(root.getChildCount()).toBe(1);
  });
});
