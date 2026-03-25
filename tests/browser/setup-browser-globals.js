import Browser from "../../lib/Browser.js";

function defineGlobal(name, value) {
  Object.defineProperty(globalThis, name, {
    value,
    configurable: true,
    writable: true,
  });
}

defineGlobal("window", Browser.window);
defineGlobal("document", Browser.document);
defineGlobal("navigator", Browser.navigator);
defineGlobal("XMLHttpRequest", Browser.window.XMLHttpRequest);
defineGlobal("DOMParser", Browser.window.DOMParser);
defineGlobal("HTMLCanvasElement", Browser.window.HTMLCanvasElement);
defineGlobal("HTMLImageElement", Browser.window.HTMLImageElement);
defineGlobal("Image", Browser.window.HTMLImageElement);
defineGlobal("localStorage", Browser.window.localStorage);
