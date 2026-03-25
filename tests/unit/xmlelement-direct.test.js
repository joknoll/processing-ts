import { describe, expect, test } from "vite-plus/test";

import XMLAttributeFactory from "../../src/Objects/XMLAttribute.js";
import XMLElementFactory from "../../src/Objects/XMLElement.js";
import { getSharedTestBrowser } from "./helpers/test-browser.js";

const Browser = getSharedTestBrowser();
const XMLAttribute = XMLAttributeFactory();
const XMLElement = XMLElementFactory({ Browser, XMLAttribute });

describe("XMLElement direct contracts", () => {
  test("supports namespaced attributes through set/get/remove helpers", () => {
    const element = new XMLElement("svg:g", "urn:test");
    element.setName("svg:g", "urn:test");

    element.setAttribute("svg:id", "urn:test", "node-1");
    element.setAttribute("fill", "#fff");

    expect(element.getName()).toBe("svg:g");
    expect(element.getLocalName()).toBe("g");
    expect(element.getAttribute("id", "urn:test", "missing")).toBe("node-1");
    expect(element.getString("fill")).toBe("#fff");

    element.removeAttribute("id", "urn:test");

    expect(element.getAttribute("id", "urn:test", "missing")).toBe("missing");
    expect(element.getAttributeCount()).toBe(1);
    expect(element.toString()).toBe('<svg:g fill="#fff"/>');
  });

  test("compares attribute sets independent of order but keeps child order significant", () => {
    const left = new XMLElement("shape");
    left.setAttribute("width", "10");
    left.setAttribute("height", "20");
    left.addChild(new XMLElement("first"));
    left.addChild(new XMLElement("second"));

    const right = new XMLElement("shape");
    right.setAttribute("height", "20");
    right.setAttribute("width", "10");
    right.addChild(new XMLElement("first"));
    right.addChild(new XMLElement("second"));

    const reorderedChildren = new XMLElement("shape");
    reorderedChildren.setAttribute("width", "10");
    reorderedChildren.setAttribute("height", "20");
    reorderedChildren.addChild(new XMLElement("second"));
    reorderedChildren.addChild(new XMLElement("first"));

    expect(left.equals(right)).toBe(true);
    expect(left.equals(reorderedChildren)).toBe(false);
  });

  test("supports path lookups and serializes CDATA content safely", () => {
    const root = new XMLElement("root");
    const group = new XMLElement("group");
    const leaf = new XMLElement("leaf");

    leaf.setContent("payload");
    group.addChild(leaf);
    root.addChild(group);

    const cdata = root.createCDataElement(`<tag a="b">'x'</tag>`);

    expect(root.getChild("group/leaf")).toBe(leaf);
    expect(root.getChildren("group/leaf")).toEqual([leaf]);
    expect(cdata.type).toBe("CDATA");
    expect(cdata.toString()).toBe("&lt;tag a=&quot;b&quot;&gt;&apos;x&apos;&lt;/tag&gt;");
  });
});
