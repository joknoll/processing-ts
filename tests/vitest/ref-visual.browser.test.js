import { afterEach, beforeEach, describe, expect, test } from "vitest";
import {
  cleanupProcessingInstances,
  loadProcessingBundle,
  mountProcessingSketch,
  resetBrowserDom,
} from "./browser.js";

async function expectCanvasToMatchScreenshot(canvas, name) {
  await expect.element(canvas).toMatchScreenshot(name);
}

describe("ref visual regression tests", () => {
  beforeEach(async () => {
    resetBrowserDom();
    await loadProcessingBundle();
  });

  afterEach(() => {
    cleanupProcessingInstances();
    resetBrowserDom();
  });

  test("renders ellipse.pde", async () => {
    const { canvas } = await mountProcessingSketch({
      fixtureName: "ellipse.pde",
      canvasId: "ref-ellipse",
      waitForExit: true,
    });

    await expectCanvasToMatchScreenshot(canvas, "ellipse");
  });

  test("renders text-defaults.pde", async () => {
    const { canvas } = await mountProcessingSketch({
      fixtureName: "text-defaults.pde",
      canvasId: "ref-text-defaults",
      waitForExit: true,
    });

    await expectCanvasToMatchScreenshot(canvas, "text-defaults");
  });

  test("renders translate.pde after its fixed animation run", async () => {
    const { canvas } = await mountProcessingSketch({
      fixtureName: "translate.pde",
      canvasId: "ref-translate",
      waitForFrames: 65,
      waitForExit: true,
    });

    await expectCanvasToMatchScreenshot(canvas, "translate");
  });

  test("renders box.pde", async () => {
    const { canvas } = await mountProcessingSketch({
      fixtureName: "box.pde",
      canvasId: "ref-box",
      waitForExit: true,
    });

    await expectCanvasToMatchScreenshot(canvas, "box");
  });
});
