import { describe, expect, test, vi } from "vite-plus/test";

import createDrawLoopScheduler from "../../src/Helpers/drawLoopScheduler.js";

function createFakeWindow() {
  let nextId = 1;
  const intervals = new Map();

  return {
    setInterval: vi.fn((fn, ms) => {
      const id = nextId++;
      intervals.set(id, { fn, ms });
      return id;
    }),
    clearInterval: vi.fn((id) => {
      intervals.delete(id);
    }),
    runInterval(id) {
      const interval = intervals.get(id);
      if (interval) {
        interval.fn();
      }
    },
  };
}

describe("drawLoopScheduler helper", () => {
  test("starts, stops, and suspends while preserving desired loop state", () => {
    const window = createFakeWindow();
    const callbacks = {
      resetFrameRateState: vi.fn(),
      onDrawFrame: vi.fn(),
      onFrameStart: vi.fn(),
      onFrameEnd: vi.fn(),
      onLoop: vi.fn(),
      onPause: vi.fn(),
    };
    const scheduler = createDrawLoopScheduler({
      window,
      intervalMs: 16,
      ...callbacks,
    });

    scheduler.start();

    expect(window.setInterval).toHaveBeenCalledWith(expect.any(Function), 16);
    expect(scheduler.shouldRun()).toBe(true);
    expect(scheduler.isRunning()).toBe(true);
    expect(callbacks.onLoop).toHaveBeenCalledTimes(1);

    scheduler.suspend();

    expect(scheduler.shouldRun()).toBe(true);
    expect(scheduler.isRunning()).toBe(false);
    expect(callbacks.onPause).toHaveBeenCalledTimes(1);

    scheduler.stop();

    expect(scheduler.shouldRun()).toBe(false);
    expect(scheduler.isRunning()).toBe(false);
    expect(callbacks.onPause).toHaveBeenCalledTimes(2);
  });

  test("clears the interval and rethrows frame errors", () => {
    const window = createFakeWindow();
    const scheduler = createDrawLoopScheduler({
      window,
      intervalMs: 20,
      resetFrameRateState: vi.fn(),
      onFrameStart: vi.fn(),
      onFrameEnd: vi.fn(),
      onLoop: vi.fn(),
      onPause: vi.fn(),
      onDrawFrame: vi.fn(() => {
        throw new Error("boom");
      }),
    });

    scheduler.start();

    expect(() => window.runInterval(1)).toThrow("boom");
    expect(window.clearInterval).toHaveBeenCalledWith(1);
    expect(scheduler.isRunning()).toBe(true);
    expect(scheduler.shouldRun()).toBe(true);
  });
});
