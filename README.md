# processing-ts

A modern ESM port of Processing.js to run Processing sketches in the browser on a canvas.

## Usage

```ts
import { Processing } from "processing-ts/browser";

const canvas = document.getElementById("sketch") as HTMLCanvasElement;
const sketch = new Processing(canvas, `
  void setup() {
    size(400, 400);
  }

  void draw() {
    background(0);
    fill(255, 255, 0);
    ellipse(mouseX, mouseY, 20, 20);
  }
`);

// Stop the sketch
sketch.exit();
```

The `processing-ts/browser` import is SSR-safe — `Processing` will be `null` on the server and only initialized in a browser environment.

### Compile without running

```ts
const { sourceCode } = Processing.compile(sketchSource);
console.log(sourceCode); // transpiled JavaScript
```

### Sketch lifecycle hooks

```ts
const sketch = Processing.Sketch((p) => {
  p.onSetup = () => console.log("setup called");
  p.onFrameEnd = () => console.log("frame drawn");
  p.setup = () => { p.size(200, 200); };
  p.draw = () => { p.background(0); };
});
```

### Custom environment

If you need to provide your own browser adapter (e.g. for testing), use `createProcessing` from the main entry:

```ts
import { createProcessing } from "processing-ts";

const Processing = createProcessing({ isDomPresent: true, navigator, window, document, ajax });
```

## Playground

A live playground is included under `playground/`. It lets you edit Processing sketches in the browser and see the compiled output in real time.

```sh
cd playground
npm install
npm run dev
```

## License

MIT
