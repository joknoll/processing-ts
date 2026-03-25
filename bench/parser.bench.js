import { bench, describe } from "vitest";

import { getProcessing } from "./bench-harness.js";

const Processing = getProcessing();

const parserBenchmarks = [
  {
    name: "compile minimal sketch",
    source: `
      void setup() {
        size(100, 100);
        noLoop();
      }
    `,
  },
  {
    name: "compile transform-heavy sketch",
    source: `
      float angle = 0.0;

      void setup() {
        size(200, 200, P3D);
      }

      void draw() {
        background(240);
        translate(width / 2, height / 2, -50);
        rotateX(angle * 0.5);
        rotateY(angle);
        scale(1.2, 0.8, 1.1);

        for (int i = 0; i < 40; i++) {
          pushMatrix();
          rotateZ(angle + i * 0.1);
          translate(i, i * 0.5, i * 0.25);
          box(10 + i % 3);
          popMatrix();
        }

        angle += 0.01;
      }
    `,
  },
  {
    name: "compile collection-heavy sketch",
    source: `
      ArrayList points = new ArrayList();

      void setup() {
        size(160, 160);
        smooth();

        for (int i = 0; i < 120; i++) {
          points.add(new PVector(i, i * 0.5, i % 7));
        }
      }

      void draw() {
        background(255);

        for (int i = 1; i < points.size(); i++) {
          PVector a = (PVector) points.get(i - 1);
          PVector b = (PVector) points.get(i);
          line(a.x, a.y, b.x, b.y);
        }
      }
    `,
  },
];

describe("parser compile throughput", () => {
  for (const fixture of parserBenchmarks) {
    bench(fixture.name, () => {
      Processing.compile(fixture.source);
    });
  }
});
