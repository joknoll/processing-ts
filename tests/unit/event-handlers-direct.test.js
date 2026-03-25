import { describe, expect, test, vi } from "vite-plus/test";

import createEventHandlers from "../../src/Helpers/eventHandlers.js";

describe("eventHandlers helper", () => {
  test("detaches matching listeners for a specific element", () => {
    const listeners = createEventHandlers();
    const firstElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    const secondElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    const moveHandler = vi.fn();
    const downHandler = vi.fn();
    const otherHandler = vi.fn();

    listeners.attach(firstElement, "mousemove", moveHandler);
    listeners.attach(firstElement, "mousedown", downHandler);
    listeners.attach(secondElement, "mousemove", otherHandler);

    listeners.detachByType(firstElement, ["mousemove"]);

    expect(firstElement.removeEventListener).toHaveBeenCalledWith("mousemove", moveHandler, false);
    expect(firstElement.removeEventListener).not.toHaveBeenCalledWith(
      "mousedown",
      downHandler,
      false,
    );
    expect(secondElement.removeEventListener).not.toHaveBeenCalled();
  });

  test("falls back to legacy attachEvent and detachEvent", () => {
    const listeners = createEventHandlers();
    const element = {
      attachEvent: vi.fn(),
      detachEvent: vi.fn(),
    };
    const handler = vi.fn();

    listeners.attach(element, "keydown", handler);
    listeners.detachAll();

    expect(element.attachEvent).toHaveBeenCalledWith("onkeydown", handler);
    expect(element.detachEvent).toHaveBeenCalledWith("onkeydown", handler);
  });
});
