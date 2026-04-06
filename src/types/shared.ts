export interface ProcessingSketch {
  exit(): void;
}

export interface ProcessingLogger {
  BufferArray?: string[];
  javaconsole?: HTMLDivElement;
  hideconsole?: () => void;
}

export interface CompiledProcessingSketch {
  sourceCode?: string;
}

export interface ProcessingStatic {
  new (
    canvas?: HTMLCanvasElement | string,
    source?: string,
    functions?: Record<string, unknown>,
  ): ProcessingSketch;
  compile(source: string): CompiledProcessingSketch;
  logger?: ProcessingLogger;
}

export interface ProcessingEnvironment {
  isDomPresent: boolean;
  navigator?: Navigator;
  window: Window & typeof globalThis;
  document: Document;
  ajax(url: string): string;
}

export interface ProcessingRunnerState {
  compilePreview: string;
  consoleHtml: string;
  error: string;
  status: string;
}

export interface ProcessingRunnerOptions {
  autoRun?: boolean;
}

export interface ProcessingRunner {
  attachCanvas(canvas: HTMLCanvasElement): () => void;
  attachConsole(element: HTMLElement): () => void;
  getState(): ProcessingRunnerState;
  run(): ProcessingSketch | null;
  stop(): void;
  subscribe(subscriber: (state: ProcessingRunnerState) => void): () => void;
}
