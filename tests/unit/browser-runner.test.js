import { describe, expect, test } from "vite-plus/test";

import { createProcessingSketch } from "../../src/entry/svelte.ts";

function waitForMicrotask() {
  return new Promise((resolve) => {
    queueMicrotask(resolve);
  });
}

describe("createProcessingSketch", () => {
  test("runs sketches and mirrors console output through a store interface", async () => {
    document.body.innerHTML = "";

    let source = `
      void setup() {
        size(12, 12);
        background(255, 0, 0);
        println("runner ready");
        noLoop();
      }
    `;

    const canvas = document.createElement("canvas");
    const consolePanel = document.createElement("div");
    document.body.appendChild(canvas);
    document.body.appendChild(consolePanel);

    const runner = createProcessingSketch(() => source);
    const detachConsole = runner.attachConsole(consolePanel);
    const detachCanvas = runner.attachCanvas(canvas);

    await waitForMicrotask();

    expect(canvas.width).toBe(12);
    expect(canvas.height).toBe(12);
    expect(runner.getState().status).toBe("Sketch is running.");
    expect(runner.getState().compilePreview).toContain("size");
    expect(runner.getState().consoleHtml).toContain("runner ready");

    source = `
      void setup() {
        size(10, 10);
        background(0, 255, 0);
        noLoop();
      }
    `;

    runner.run();

    expect(canvas.width).toBe(10);
    expect(canvas.height).toBe(10);
    expect(runner.getState().status).toBe("Sketch is running.");

    detachCanvas();
    detachConsole();
    runner.stop();
  });
});
