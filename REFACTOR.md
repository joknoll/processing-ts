# Refactoring Notes

## Top Areas of Technical Debt

### 1. Monolithic `Processing.js` — Critical

**13,776 lines**, 518 functions, zero unit tests. 2D/3D rendering, event handling, image loading, and the draw loop are all interleaved with no internal boundaries.

- Try/catch around the draw loop (~line 4501) silently swallows errors
- `TODO` on line 8608: unresolved design question about where a function belongs
- Drawing2D/Drawing3D are ad-hoc prototype-based variants mixed into the same file
- No ability to unit-test individual functions in isolation

### 2. SVG/XML Handling — High

`PShapeSVG.js` (1,109 lines) + `XMLElement.js` (861 lines) = ~2K lines of complex recursive parsing with **zero dedicated tests**.

- TODOs for unimplemented viewBox scaling
- Partial gradient support with undefined edge-case behavior
- Silent failures when `DOMParser` is unavailable in headless environments

### 3. `Parser.js` — High

2,550-line regex-based transpiler. The source itself warns not to touch it without understanding it deeply.

- No unit tests for individual parsing rules or error cases
- Coverage comes only from regression-style `.pde` fixture files
- Parser state is implicit; no documented contract for valid inputs
- Implicit behavior for `this` → `$this_N.$self` rewriting (line ~1630)

### 4. Event Lifecycle — Medium

Event handlers stored in a global array in `Processing.js` (~line 139) with a likely bug:
`detachEventHandlersByType()` references `eventHandler.type` instead of the `type` parameter.

- Touch/mouse handlers live separately in `P5Functions/touchmouse.js`
- No tests for multi-instance isolation or handler cleanup on `exit()`
- Memory leak potential when instances are not properly disposed

### 5. Font/Image Loading — Medium

`finalizeProcessing.js` + `PFont.js` (~768 lines combined):

- No timeout or retry for `imageCache` preloading — failed loads silently leave `null` in cache
- Font preloading errors are swallowed
- Opera-specific workaround injects absolutely-positioned DOM nodes — fragile and untested

---

## Module Communication

The architecture uses **manual dependency injection via factory functions** — no classes, no DI framework.

### Assembly Flow (`src/index.js → buildProcessingJS`)

```
index.js
  │
  ├─ Instantiate leaf objects first
  │   (ArrayList, HashMap, PVector, PFont, PMatrix2D/3D,
  │    XMLElement, XMLAttribute, PShape, PShapeSVG, Char, …)
  │
  ├─ Build defaultScope
  │   └─ Single shared namespace containing all types + PConstants
  │   └─ Becomes the "p" object that every sketch writes into
  │
  ├─ Create Processing constructor (src/Processing.js factory)
  │   └─ Receives: defaultScope + Browser + four P5Function mixins
  │       ├─ P5Functions/Math.js
  │       ├─ P5Functions/commonFunctions.js
  │       ├─ P5Functions/JavaProxyFunctions.js
  │       └─ P5Functions/touchmouse.js
  │
  ├─ Wrap with Parser (src/Parser/Parser.js)
  │   └─ Reads defaultScope for symbol resolution during transpilation
  │
  └─ Finalize (lifecycle methods, DOM event listeners, version)
```

### Sketch Execution Flow

```
.pde source code
  → Parser.js: preprocesses @pjs directives, regex-transpiles to JS
  → new Function(…) executes generated JS with "p" as context
  → p.setup() then p.draw() loop
      → drawing commands dispatch to Drawing2D or Drawing3D
        (prototype chain polymorphism, no interface enforcement)
      → canvas 2D context or WebGL via the Browser abstraction
```

### Critical Coupling Points

- **`defaultScope`** is a single point of failure — all objects share it as their global namespace
- **`Browser`** must perfectly mirror the real DOM API; `lib/Browser.js` is a 1,053-line fake that must stay in sync (see Browser Abstraction below)
- **Parser depends on runtime types** — adding a new type requires changes to Parser + defaultScope + index.js
- **Drawing2D/3D** use implicit duck typing; mismatched method signatures cause silent failures

---

## Test Coverage Reality

~6 test files for ~25K lines of source. Coverage comes almost entirely from 179 `.pde` fixture files
that exercise the full compile → run pipeline. Good for regression, but no ability to test individual
modules or error paths in isolation.

| Area               | Files                               | Lines  | Severity |
| ------------------ | ----------------------------------- | ------ | -------- |
| Monolithic runtime | `Processing.js`                     | 13,776 | Critical |
| SVG/XML handling   | `PShapeSVG.js`, `XMLElement.js`     | 1,970  | High     |
| Parser             | `Parser.js`                         | 2,550  | High     |
| Event lifecycle    | `Processing.js`, `touchmouse.js`    | ~500   | Medium   |
| Font/image loading | `PFont.js`, `finalizeProcessing.js` | ~768   | Medium   |
