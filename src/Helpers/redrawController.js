export default function createRedrawController(options) {
  var p = options.p,
    now = options.now || Date.now,
    timeSinceLastFPS = options.startTime,
    framesSinceLastFPS = 0,
    pmouseXLastFrame = 0,
    pmouseYLastFrame = 0;

  function updateFrameRate() {
    var currentTime = now();
    var sec = (currentTime - timeSinceLastFPS) / 1000;
    framesSinceLastFPS++;
    var fps = framesSinceLastFPS / sec;

    // Recalculate FPS every half second for better accuracy.
    if (sec > 0.5) {
      timeSinceLastFPS = currentTime;
      framesSinceLastFPS = 0;
      p.__frameRate = fps;
    }

    p.frameCount++;
  }

  return {
    resetFrameRateState: function () {
      timeSinceLastFPS = now();
      framesSinceLastFPS = 0;
    },

    run: function (drawFrame) {
      var pmouseXLastEvent = p.pmouseX,
        pmouseYLastEvent = p.pmouseY;

      updateFrameRate();
      p.pmouseX = pmouseXLastFrame;
      p.pmouseY = pmouseYLastFrame;

      drawFrame();

      pmouseXLastFrame = p.mouseX;
      pmouseYLastFrame = p.mouseY;
      p.pmouseX = pmouseXLastEvent;
      p.pmouseY = pmouseYLastEvent;
    },
  };
}
