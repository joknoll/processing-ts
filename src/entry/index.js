import buildProcessingJS from "../index.js";
import { PROCESSING_VERSION } from "./version.js";

export function createProcessing(Browser, testHarness) {
  return buildProcessingJS(Browser, testHarness, {
    version: PROCESSING_VERSION,
  });
}
