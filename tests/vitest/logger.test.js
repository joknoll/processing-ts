import { describe, expect, test } from "vitest";

import Browser from "../../lib/Browser.js";
import { createProcessing } from "../../src/entry/index.js";

const Processing = createProcessing(Browser);

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
