import Browser from "../../../lib/Browser.js";

function instrumentEventTarget(target) {
  const original = {
    addEventListener: target.addEventListener,
    removeEventListener: target.removeEventListener,
    attachEvent: target.attachEvent,
    detachEvent: target.detachEvent,
  };
  const listeners = [];
  const removedListeners = [];

  target.addEventListener = function addEventListener(type, fn) {
    listeners.push({ type, fn });
  };
  target.removeEventListener = function removeEventListener(type, fn) {
    removedListeners.push({ type, fn });

    const index = listeners.findIndex((listener) => listener.type === type && listener.fn === fn);
    if (index >= 0) {
      listeners.splice(index, 1);
    }
  };
  target.attachEvent = function attachEvent(name, fn) {
    target.addEventListener(name.replace(/^on/, ""), fn);
  };
  target.detachEvent = function detachEvent(name, fn) {
    target.removeEventListener(name.replace(/^on/, ""), fn);
  };

  return {
    listeners,
    removedListeners,
    restore() {
      target.addEventListener = original.addEventListener;
      target.removeEventListener = original.removeEventListener;
      target.attachEvent = original.attachEvent;
      target.detachEvent = original.detachEvent;
    },
  };
}

function createInstrumentedCanvas(baseCanvas) {
  const canvas = Object.assign(Object.create(baseCanvas), baseCanvas);
  const eventState = instrumentEventTarget(canvas);

  canvas.focus = () => {};
  canvas.blur = () => {};
  canvas.__listeners = eventState.listeners;
  canvas.__removedListeners = eventState.removedListeners;
  canvas.__restoreEventTarget = eventState.restore;

  return canvas;
}

function instrumentBrowser() {
  const documentState = instrumentEventTarget(Browser.document);
  const windowState = instrumentEventTarget(Browser.window);
  const originalCreateElement = Browser.document.createElement;

  Browser.document.__listeners = documentState.listeners;
  Browser.document.__removedListeners = documentState.removedListeners;
  Browser.window.__listeners = windowState.listeners;
  Browser.window.__removedListeners = windowState.removedListeners;

  Browser.document.createElement = function createElement(tag) {
    const element = originalCreateElement.call(this, tag);
    if (tag === "canvas") {
      return createInstrumentedCanvas(element);
    }
    return element;
  };

  return {
    browser: Browser,
    restore() {
      delete Browser.document.__listeners;
      delete Browser.document.__removedListeners;
      delete Browser.window.__listeners;
      delete Browser.window.__removedListeners;
      Browser.document.createElement = originalCreateElement;
      documentState.restore();
      windowState.restore();
    },
  };
}

export { instrumentBrowser };
