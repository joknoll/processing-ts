import { bench, describe } from "vitest";

import { getRuntimeProcessing } from "./bench-harness.js";

const processing = getRuntimeProcessing();

describe("runtime math hotspots", () => {
  bench("PVector normalize/add/mult pipeline", () => {
    const vector = new processing.PVector(40, 20, 10);
    const delta = new processing.PVector(5, -3, 2);

    for (let index = 0; index < 200; index += 1) {
      vector.add(delta);
      vector.normalize();
      vector.mult(32);
    }
  });

  bench("PMatrix2D transform chain", () => {
    const matrix = new processing.PMatrix2D();

    for (let index = 0; index < 200; index += 1) {
      matrix.rotate(0.05);
      matrix.scale(1.01, 0.99);
      matrix.translate(3, -2);
      matrix.mult([12, 18], []);
    }
  });

  bench("PMatrix3D transform chain", () => {
    const matrix = new processing.PMatrix3D();

    for (let index = 0; index < 100; index += 1) {
      matrix.rotateX(0.03);
      matrix.rotateY(0.05);
      matrix.translate(3, -2, 4);
      matrix.scale(1.01, 0.99, 1.02);
      matrix.mult([12, 18, 24], [0, 0, 0]);
    }
  });
});
