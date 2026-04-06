import buildProcessingJS from "../index.js";
import { PROCESSING_VERSION } from "./version.js";
import type {
  ProcessingEnvironment,
  ProcessingStatic,
} from "../types/shared.js";

export function createProcessing(
  Browser: ProcessingEnvironment,
  testHarness?: unknown,
): ProcessingStatic {
  return buildProcessingJS(Browser, testHarness, {
    version: PROCESSING_VERSION,
  });
}
