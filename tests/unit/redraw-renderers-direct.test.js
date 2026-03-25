import { describe, expect, test, vi } from "vite-plus/test";

import createRedrawRenderers from "../../src/Helpers/redrawRenderers.js";

describe("redrawRenderers helper", () => {
  test("runs the 2D redraw sequence through the shared redraw controller", () => {
    const calls = [];
    const context = {};
    const redrawRenderers = createRedrawRenderers({
      redrawController: {
        run(fn) {
          calls.push("run");
          fn();
        },
      },
      getContext: () => context,
      getLineWidth: () => 7,
      saveContext: () => calls.push("save"),
      restoreContext: () => calls.push("restore"),
      draw: () => calls.push("draw"),
      resetContextCache: vi.fn(),
      resetSceneState: vi.fn(),
    });

    redrawRenderers.redraw2D();

    expect(context.lineWidth).toBe(7);
    expect(calls).toEqual(["run", "save", "draw", "restore"]);
  });

  test("runs the 3D redraw sequence through the shared redraw controller", () => {
    const calls = [];
    const context = {
      DEPTH_BUFFER_BIT: "depth",
      clear: vi.fn((buffer) => calls.push(["clear", buffer])),
    };
    const redrawRenderers = createRedrawRenderers({
      redrawController: {
        run(fn) {
          calls.push("run");
          fn();
        },
      },
      getContext: () => context,
      getLineWidth: vi.fn(),
      saveContext: vi.fn(),
      restoreContext: vi.fn(),
      draw: () => calls.push("draw"),
      resetContextCache: () => calls.push("reset-cache"),
      resetSceneState: () => calls.push("reset-scene"),
    });

    redrawRenderers.redraw3D();

    expect(context.clear).toHaveBeenCalledWith("depth");
    expect(calls).toEqual([
      "run",
      ["clear", "depth"],
      "reset-cache",
      "reset-scene",
      "draw",
    ]);
  });
});
