export default function createDrawLoopScheduler(options) {
  var window = options.window,
    intervalMs = options.intervalMs,
    looping = 0,
    loopStarted = false,
    doLoop = true;

  function clearLoop() {
    window.clearInterval(looping);
  }

  function runFrame() {
    try {
      options.onFrameStart();
      options.onDrawFrame();
      options.onFrameEnd();
    } catch (error) {
      clearLoop();
      throw error;
    }
  }

  return {
    isRunning: function () {
      return loopStarted;
    },

    shouldRun: function () {
      return doLoop;
    },

    setInterval: function (nextIntervalMs) {
      intervalMs = nextIntervalMs;
    },

    stop: function () {
      doLoop = false;
      loopStarted = false;
      clearLoop();
      options.onPause();
    },

    start: function () {
      if (loopStarted) {
        return;
      }

      options.resetFrameRateState();
      looping = window.setInterval(runFrame, intervalMs);
      doLoop = true;
      loopStarted = true;
      options.onLoop();
    },

    suspend: function () {
      if (doLoop && loopStarted) {
        this.stop();
        doLoop = true;
      }
    },

    shutdown: function () {
      clearLoop();
    },
  };
}
