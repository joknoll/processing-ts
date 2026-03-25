import { describe, expect, test } from "vite-plus/test";
import { mountProcessingSketch, setupProcessingBrowserSuite } from "./browser.js";

async function expectCanvasToMatchScreenshot(canvas, name) {
  await expect.element(canvas).toMatchScreenshot(name);
}

const visualFixtures = [
  {
    canvasId: "ref-ellipse",
    fixtureName: "ellipse.pde",
    screenshotName: "ellipse",
  },
  {
    canvasId: "ref-text-defaults",
    fixtureName: "text-defaults.pde",
    screenshotName: "text-defaults",
  },
  {
    canvasId: "ref-translate",
    fixtureName: "translate.pde",
    screenshotName: "translate",
    waitForFrames: 65,
  },
  {
    canvasId: "ref-box",
    fixtureName: "box.pde",
    screenshotName: "box",
  },
];

describe.skip("ref visual regression tests", () => {
  setupProcessingBrowserSuite();

  test.each(visualFixtures)("renders $fixtureName", async (fixture) => {
    const { canvas } = await mountProcessingSketch(fixture);

    await expectCanvasToMatchScreenshot(canvas, fixture.screenshotName);
  });
});
