import Browser from "../lib/Browser.js";
import testHarness from "../lib/TestHarness.js";
import { createProcessing } from "../src/entry/index.js";

const Processing = createProcessing(Browser, testHarness);
const runtimeSource = `
  void setup() {
    size(1, 1);
    noLoop();
  }
`;

let runtimeProcessing;

export function getProcessing() {
  return Processing;
}

export function getRuntimeProcessing() {
  if (!runtimeProcessing) {
    const canvas = Browser.document.createElement("canvas");
    runtimeProcessing = new Processing(canvas, runtimeSource, testHarness);
  }

  return runtimeProcessing;
}
