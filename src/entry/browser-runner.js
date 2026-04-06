function createRunnerStore(initialState) {
  let state = initialState;
  const subscribers = new Set();

  function notify() {
    for (const subscriber of subscribers) {
      subscriber(state);
    }
  }

  return {
    getState() {
      return state;
    },
    setState(patch) {
      state = { ...state, ...patch };
      notify();
    },
    subscribe(subscriber) {
      subscriber(state);
      subscribers.add(subscriber);

      return () => {
        subscribers.delete(subscriber);
      };
    },
  };
}

function scrollConsolePanel(consolePanel) {
  if (!consolePanel) {
    return;
  }

  if (typeof consolePanel.scrollTo === "function") {
    consolePanel.scrollTo({ top: consolePanel.scrollHeight });
    return;
  }

  consolePanel.scrollTop = consolePanel.scrollHeight;
}

export function createProcessingRunner(Processing, getSource, options = {}) {
  const { autoRun = true } = options;
  const store = createRunnerStore({
    compilePreview: "// Processing.compile(...) output will appear here",
    consoleHtml: "<em>Run the sketch to see println output.</em>",
    error: "",
    status: Processing
      ? "Initializing processing-ts..."
      : "processing-ts is unavailable outside the browser.",
  });

  let activeSketch = null;
  let bodyObserver = null;
  let canvasElement = null;
  let consoleObserver = null;
  let consolePanel = null;
  let attachVersion = 0;

  function clearNativeConsole() {
    const logger = Processing?.logger;

    if (logger?.BufferArray) {
      logger.BufferArray.length = 0;
    }

    if (logger?.javaconsole) {
      logger.javaconsole.innerHTML = "";
    }

    logger?.hideconsole?.();
  }

  function disconnectConsoleObservers() {
    consoleObserver?.disconnect();
    bodyObserver?.disconnect();
    consoleObserver = null;
    bodyObserver = null;
  }

  function mirrorConsole(consoleElement) {
    if (!consoleElement) {
      store.setState({ consoleHtml: "<em>No console output yet.</em>" });
      return;
    }

    const update = () => {
      store.setState({
        consoleHtml:
          consoleElement.innerHTML || "<em>No console output yet.</em>",
      });
      scrollConsolePanel(consolePanel);
    };

    update();
    consoleObserver?.disconnect();
    consoleObserver = new MutationObserver(update);
    consoleObserver.observe(consoleElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  function connectConsoleMirror() {
    const selectConsole = () =>
      Processing?.logger?.javaconsole ??
      document.querySelector(".pjsconsole .console");

    mirrorConsole(selectConsole());

    bodyObserver?.disconnect();
    bodyObserver = new MutationObserver(() => {
      const consoleElement = selectConsole();
      if (consoleElement) {
        mirrorConsole(consoleElement);
      }
    });
    bodyObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  function stop() {
    activeSketch?.exit?.();
    activeSketch = null;
    disconnectConsoleObservers();
    clearNativeConsole();
  }

  function run() {
    if (!Processing) {
      store.setState({
        error: "",
        status: "processing-ts is unavailable outside the browser.",
      });
      return null;
    }

    if (!canvasElement) {
      store.setState({
        error: "",
        status: "Attach a canvas to run the sketch.",
      });
      return null;
    }

    stop();
    store.setState({
      error: "",
      consoleHtml: "<em>Running sketch...</em>",
    });

    try {
      const source = getSource();
      const compilePreview =
        Processing.compile(source).sourceCode ??
        "// compile returned no sourceCode";

      store.setState({ compilePreview });
      activeSketch = new Processing(canvasElement, source);
      connectConsoleMirror();
      store.setState({
        error: "",
        status: "Sketch is running.",
      });
      return activeSketch;
    } catch (cause) {
      const error = cause instanceof Error ? cause.message : String(cause);

      store.setState({
        error,
        status: "Sketch failed.",
        consoleHtml: `<strong>Runtime error</strong><br>${error}`,
      });
      return null;
    }
  }

  function attachCanvas(canvas) {
    canvasElement = canvas;
    attachVersion += 1;
    const currentAttachVersion = attachVersion;

    store.setState({
      status: Processing
        ? "processing-ts loaded."
        : "processing-ts is unavailable outside the browser.",
    });

    if (Processing && autoRun) {
      queueMicrotask(() => {
        if (
          currentAttachVersion === attachVersion &&
          canvasElement === canvas
        ) {
          run();
        }
      });
    }

    return () => {
      attachVersion += 1;

      if (canvasElement === canvas) {
        canvasElement = null;
      }

      stop();
    };
  }

  function attachConsole(element) {
    consolePanel = element;
    scrollConsolePanel(consolePanel);

    return () => {
      if (consolePanel === element) {
        consolePanel = null;
      }
    };
  }

  return {
    attachCanvas,
    attachConsole,
    getState: store.getState,
    run,
    stop,
    subscribe: store.subscribe,
  };
}
