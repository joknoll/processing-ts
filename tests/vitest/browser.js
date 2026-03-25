export async function loadProcessingBundle() {
  if (window.Processing) {
    return window.Processing;
  }

  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/dist/processing.iife.js";
    script.async = false;
    script.onload = resolve;
    script.onerror = () => {
      reject(new Error("Failed to load /dist/processing.iife.js"));
    };
    document.head.appendChild(script);
  });

  if (!window.Processing) {
    throw new Error("Processing global was not defined by the IIFE bundle");
  }

  return window.Processing;
}

export async function loadTextFixture(relativePath) {
  const response = await fetch(`/${relativePath}`);

  if (!response.ok) {
    throw new Error(`Failed to load fixture: ${relativePath}`);
  }

  return response.text();
}

export async function loadRefFixture(name) {
  return loadTextFixture(`tests/ref/${name}`);
}

export function createCanvas(options = {}) {
  const canvas = document.createElement("canvas");
  const { id = `processing-test-canvas-${document.querySelectorAll("canvas").length + 1}` } =
    options;

  canvas.id = id;
  document.body.appendChild(canvas);
  return canvas;
}

export function readCanvasPixel(canvas, x = 0, y = 0) {
  const context = canvas.getContext("2d");
  const data = context.getImageData(x, y, 1, 1).data;
  return Array.from(data);
}

export async function waitForAnimationFrame(count = 2) {
  for (let index = 0; index < count; index += 1) {
    await new Promise((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  }
}

export async function waitForCondition(predicate, options = {}) {
  const { timeout = 5000, interval = 25 } = options;
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (predicate()) {
      return;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, interval);
    });
  }

  throw new Error("Timed out waiting for browser test condition");
}

export async function mountProcessingSketch(options = {}) {
  const { canvasId, source, fixtureName, waitForFrames = 2, waitForExit = false } = options;
  const Processing = await loadProcessingBundle();
  const canvas = createCanvas({ id: canvasId });
  const sketchSource = source || (await loadRefFixture(fixtureName));
  const sketch = Processing.compile(sketchSource);

  new Processing(canvas, sketch);

  await waitForCondition(() => canvas.width > 0 && canvas.height > 0);

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  await waitForAnimationFrame(waitForFrames);

  if (waitForExit) {
    await waitForCondition(
      () => !Processing.instances?.some((instance) => instance?.externals?.canvas === canvas),
      { timeout: 10000, interval: 50 },
    );
    await waitForAnimationFrame();
  }

  return { canvas, sketch, source: sketchSource };
}

export function cleanupProcessingInstances() {
  const instances = window.Processing?.instances;

  if (!Array.isArray(instances)) {
    return;
  }

  for (let index = instances.length - 1; index >= 0; index -= 1) {
    instances[index]?.exit?.();
  }
}

export function resetBrowserDom() {
  document.head.innerHTML = "";
  document.body.innerHTML = "";
}
