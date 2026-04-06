import { Processing } from "./browser-esm.js";
import { createProcessingRunner as createRunnerImpl } from "./browser-runner.js";
import type {
  ProcessingRunner,
  ProcessingRunnerOptions,
  ProcessingStatic,
} from "../types/shared.js";

const createRunner = createRunnerImpl as (
  processing: ProcessingStatic | null,
  getSource: () => string,
  options?: ProcessingRunnerOptions,
) => ProcessingRunner;

export function createProcessingSketch(
  getSource: () => string,
  options?: ProcessingRunnerOptions,
): ProcessingRunner {
  return createRunner(Processing, getSource, options);
}

export const createProcessingRunner = createProcessingSketch;
