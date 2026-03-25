import { describe, expect, test } from "vite-plus/test";

import {
  appendDeclarativeProcessingScript,
  createCanvas,
  loadProcessingBundle,
  loadTextFixture,
  mountInlineProcessingSketch,
  readCanvasPixel,
  setupProcessingBrowserSuite,
  waitForAnimationFrame,
} from "./browser.js";

describe("browser bundle smoke tests", () => {
  setupProcessingBrowserSuite();

  test("exposes the Processing global from the built bundle", () => {
    expect(window.Processing).toBeTypeOf("function");
    expect(window.Processing.compile).toBeTypeOf("function");
    expect(window.Processing.reload).toBeTypeOf("function");
  });

  test("compiles Processing source via the built bundle", () => {
    const sketch = window.Processing.compile(`
      void setup() {
        size(10, 10);
      }
    `);

    expect(sketch).toBeTruthy();
    expect(sketch.sourceCode).toContain("size");
  });

  test("instantiates a sketch and renders to canvas", async () => {
    const { canvas } = await mountInlineProcessingSketch(
      `
        void setup() {
          size(12, 12);
          background(255, 0, 0);
          noLoop();
        }
      `,
      {
        waitForFrames: 1,
      },
    );

    expect(canvas.width).toBe(12);
    expect(canvas.height).toBe(12);
    expect(readCanvasPixel(canvas, 6, 6)).toEqual([255, 0, 0, 255]);
  });

  test("instantiates a sketch compiled from an existing PDE fixture", async () => {
    const canvas = createCanvas();
    const source = await loadTextFixture("tests/ref/ellipse.pde");
    const sketch = window.Processing.compile(source);

    new window.Processing(canvas, sketch);

    await expect.poll(() => canvas.width).toBeGreaterThan(0);
    await expect.poll(() => canvas.height).toBeGreaterThan(0);
  });

  test("supports declarative auto-init against a target canvas", async () => {
    const canvas = document.createElement("canvas");
    canvas.id = "auto-target";
    document.body.appendChild(canvas);

    appendDeclarativeProcessingScript({
      targetId: "auto-target",
      source: `
      void setup() {
        size(14, 14);
        background(0, 255, 0);
        noLoop();
      }
    `,
    });

    window.Processing.reload();
    await waitForAnimationFrame();

    expect(canvas.width).toBe(14);
    expect(canvas.height).toBe(14);
    expect(readCanvasPixel(canvas, 7, 7)).toEqual([0, 255, 0, 255]);
  });
});
