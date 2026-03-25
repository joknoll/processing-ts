import { afterEach, beforeEach, describe, expect, test } from "vitest";
import {
  cleanupProcessingInstances,
  createCanvas,
  loadProcessingBundle,
  loadTextFixture,
  readCanvasPixel,
  resetBrowserDom,
  waitForAnimationFrame,
} from "./browser.js";

describe("browser bundle smoke tests", () => {
  beforeEach(async () => {
    resetBrowserDom();
    await loadProcessingBundle();
  });

  afterEach(() => {
    cleanupProcessingInstances();
    resetBrowserDom();
  });

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
    const canvas = createCanvas();

    new window.Processing(
      canvas,
      `
        void setup() {
          size(12, 12);
          background(255, 0, 0);
          noLoop();
        }
      `,
    );

    await waitForAnimationFrame();

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

    const script = document.createElement("script");
    script.type = "text/processing";
    script.setAttribute("data-processing-target", "auto-target");
    script.textContent = `
      void setup() {
        size(14, 14);
        background(0, 255, 0);
        noLoop();
      }
    `;
    document.body.appendChild(script);

    window.Processing.reload();
    await waitForAnimationFrame();

    expect(canvas.width).toBe(14);
    expect(canvas.height).toBe(14);
    expect(readCanvasPixel(canvas, 7, 7)).toEqual([0, 255, 0, 255]);
  });
});
