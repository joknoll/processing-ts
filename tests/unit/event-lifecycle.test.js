import { describe, expect, test } from "vitest";

import { instrumentBrowser } from "./helpers/browser.js";
import { instantiateSketch } from "./helpers/processing.js";

describe("event lifecycle", () => {
  test("touch activation detaches mouse listeners from the canvas", () => {
    const { browser, restore } = instrumentBrowser();

    try {
      const canvas = browser.document.createElement("canvas");
      const sketch = instantiateSketch("void setup() {}", {
        canvas,
        testName: "touch cleanup",
      });

      const touchStartHandler = canvas.__listeners.find((listener) => listener.type === "touchstart");

      expect(touchStartHandler).toBeDefined();
      expect(canvas.__listeners.some((listener) => listener.type === "mousemove")).toBe(true);
      expect(canvas.__listeners.some((listener) => listener.type === "mousedown")).toBe(true);

      touchStartHandler.fn({
        touches: [{ pageX: 10, pageY: 12, target: canvas }],
        targetTouches: [{ pageX: 10, pageY: 12, target: canvas }],
        changedTouches: [{ pageX: 10, pageY: 12, target: canvas }],
        preventDefault() {},
      });

      expect(canvas.__removedListeners.some((listener) => listener.type === "mousemove")).toBe(true);
      expect(canvas.__removedListeners.some((listener) => listener.type === "mousedown")).toBe(true);
      expect(canvas.__listeners.some((listener) => listener.type === "mousemove")).toBe(false);
      expect(canvas.__listeners.some((listener) => listener.type === "mousedown")).toBe(false);

      sketch.exit();
    } finally {
      restore();
    }
  });

  test("exit detaches registered listeners from canvas and document", () => {
    const { browser, restore } = instrumentBrowser();

    try {
      const canvas = browser.document.createElement("canvas");
      const sketch = instantiateSketch("void setup() {}", {
        canvas,
        testName: "exit cleanup",
      });

      expect(canvas.__listeners.length).toBeGreaterThan(0);
      expect(browser.document.__listeners.some((listener) => listener.type === "mousewheel")).toBe(true);

      sketch.exit();

      expect(canvas.__removedListeners.some((listener) => listener.type === "mousemove")).toBe(true);
      expect(canvas.__removedListeners.some((listener) => listener.type === "keydown")).toBe(true);
      expect(browser.document.__removedListeners.some((listener) => listener.type === "mousewheel")).toBe(
        true,
      );
      expect(
        browser.document.__removedListeners.some((listener) => listener.type === "DOMMouseScroll"),
      ).toBe(true);
    } finally {
      restore();
    }
  });
});
