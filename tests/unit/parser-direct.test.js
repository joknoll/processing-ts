import { describe, expect, test } from "vite-plus/test";

import { compileSource } from "./helpers/processing.js";

describe("parser direct contracts", () => {
  test("preserves sketch metadata from @pjs directives", () => {
    const sketch = compileSource(`
      /* @pjs preload="img/a.png, img/b.png"; pauseOnBlur=true; globalKeyEvents=true; param-mode=demo; crisp=true; */
      void setup() {}
    `);

    expect(sketch.options).toMatchObject({
      pauseOnBlur: true,
      globalKeyEvents: true,
      crisp: "true",
    });
    expect(sketch.params).toEqual({
      mode: "demo",
    });
    expect(sketch.imageCache.pending).toBe(2);
    expect(Object.keys(sketch.imageCache.images)).toEqual(["img/a.png", "img/b.png"]);
  });

  test("preloads fonts declared in @pjs directives", () => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";

    expect(() =>
      compileSource(`
        /* @pjs font="Vector Sans", {"fontFace":"Fancy Vector","url":"/fonts/fancy-vector.ttf"}; */
        void setup() {}
      `),
    ).not.toThrow();

    expect(document.head.innerHTML).toContain("@font-face");
    expect(document.head.innerHTML).toContain("Vector Sans");
    expect(document.head.innerHTML).toContain("Fancy Vector");
    expect(document.body.querySelectorAll("span").length).toBeGreaterThan(0);
  });

  test("binds exported setup and draw functions onto the processing instance", () => {
    const sketch = compileSource(`
      int counter = 0;

      void setup() {
        size(1, 1);
      }

      void draw() {
        counter++;
      }
    `);

    expect(sketch.sourceCode).toContain("$p.setup = setup;");
    expect(sketch.sourceCode).toContain("setup = setup.bind($p);");
    expect(sketch.sourceCode).toContain("$p.draw = draw;");
    expect(sketch.sourceCode).toContain("draw = draw.bind($p);");
  });
});
