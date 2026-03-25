import { describe, expect, test, vi } from "vite-plus/test";

import createRedrawController from "../../src/Helpers/redrawController.js";

describe("redrawController helper", () => {
  test("tracks fps and restores event mouse positions around draw execution", () => {
    let now = 1000;
    const p = {
      __frameRate: 60,
      frameCount: 0,
      mouseX: 10,
      mouseY: 20,
      pmouseX: 30,
      pmouseY: 40,
    };
    const controller = createRedrawController({
      p,
      startTime: now,
      now: () => now,
    });
    const drawFrame = vi.fn(() => {
      expect(p.pmouseX).toBe(0);
      expect(p.pmouseY).toBe(0);
      p.mouseX = 100;
      p.mouseY = 200;
    });

    controller.run(drawFrame);

    expect(drawFrame).toHaveBeenCalledTimes(1);
    expect(p.frameCount).toBe(1);
    expect(p.pmouseX).toBe(30);
    expect(p.pmouseY).toBe(40);

    now = 1600;
    p.pmouseX = 50;
    p.pmouseY = 60;

    controller.run(() => {
      expect(p.pmouseX).toBe(100);
      expect(p.pmouseY).toBe(200);
    });

    expect(p.frameCount).toBe(2);
    expect(p.__frameRate).toBeCloseTo(2 / 0.6);
    expect(p.pmouseX).toBe(50);
    expect(p.pmouseY).toBe(60);
  });

  test("resets fps accounting when the loop restarts", () => {
    let now = 1000;
    const p = {
      __frameRate: 60,
      frameCount: 0,
      mouseX: 0,
      mouseY: 0,
      pmouseX: 0,
      pmouseY: 0,
    };
    const controller = createRedrawController({
      p,
      startTime: now,
      now: () => now,
    });

    now = 1800;
    controller.resetFrameRateState();
    now = 2200;
    controller.run(() => {});

    expect(p.__frameRate).toBe(60);
    expect(p.frameCount).toBe(1);
  });
});
