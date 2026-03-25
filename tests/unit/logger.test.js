import { describe, expect, test } from "vite-plus/test";

import { createTestProcessing } from "./helpers/processing.js";

const Processing = createTestProcessing();

describe("Processing logger", () => {
  test("supports println output in module strict mode", () => {
    document.body.innerHTML = "";

    expect(() => {
      Processing.logger.println("setup complete");
      Processing.logger.println("frame", 12);
    }).not.toThrow();

    const consoleElement = Processing.logger.javaconsole;

    expect(consoleElement).toBeTruthy();
    expect(consoleElement.innerHTML).toContain("setup complete");
    expect(consoleElement.innerHTML).toContain("frame 12");
  });
});
