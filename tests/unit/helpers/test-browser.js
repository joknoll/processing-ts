import fs from "node:fs";
import path from "node:path";

import { Window } from "happy-dom";

function createWebGLStubContext() {
  const noop = () => {};

  return {
    ...createCanvas2DStubContext(),
    attachEvent: noop,
    viewport: noop,
    clearColor: noop,
    clear: noop,
    enable: noop,
    createShader: noop,
    shaderSource: noop,
    compileShader: noop,
    getShaderParameter: () => true,
    getShaderInfoLog: noop,
    createProgram: noop,
    attachShader: noop,
    linkProgram: noop,
    getProgramParameter: () => true,
    useProgram: noop,
    createBuffer: noop,
    bindBuffer: noop,
    bufferData: noop,
    blendFunc: noop,
    getAttribLocation: () => 0,
    vertexAttribPointer: noop,
    enableVertexAttribArray: noop,
    getUniformLocation: noop,
    uniform1f: noop,
    uniform2f: noop,
    uniform3f: noop,
    uniform4f: noop,
    uniformfv: noop,
    uniform2fv: noop,
    uniform3fv: noop,
    uniform1i: noop,
    uniform2i: noop,
    uniform3i: noop,
    uniform4i: noop,
    drawElements: noop,
    disable: noop,
    drawArrays: noop,
    polygonOffset: noop,
    createTexture: noop,
    texImage2D: noop,
    texParameteri: noop,
    generateMipmap: noop,
    uniformMatrix4fv: noop,
    uniform4fv: noop,
    disableVertexAttribArray: noop,
    bindTexture: noop,
  };
}

function createCanvas2DStubContext() {
  const noop = () => {};

  return {
    translate: noop,
    attachEvent: noop,
    fillRect: noop,
    strokeRect: noop,
    fillText: noop,
    measureText: () => ({ width: 1 }),
    clearRect: noop,
    beginPath: noop,
    moveTo: noop,
    lineTo: noop,
    rect: noop,
    save: noop,
    stroke: noop,
    fill: noop,
    rotate: noop,
    closePath: noop,
    arc: noop,
    scale: noop,
    restore: noop,
    bezierCurveTo: noop,
    getImageData: () => ({
      width: 1,
      height: 1,
      data: new Uint8ClampedArray([1, 2, 3, 4]),
    }),
    createImageData: () => ({
      width: 1,
      height: 1,
      data: new Uint8ClampedArray([1, 2, 3, 4]),
    }),
    drawImage: noop,
    putImageData: noop,
    lineWidth: noop,
    setTransform: noop,
  };
}

function resolveRequestPath(url) {
  if (!url) {
    return null;
  }

  if (/^(https?:)?\/\//.test(url) || url.startsWith("data:")) {
    return null;
  }

  const normalized = url.startsWith("/") ? url.slice(1) : url;
  return path.resolve(process.cwd(), normalized);
}

function installCanvasSupport(window) {
  const { document } = window;
  const originalCreateElement = document.createElement.bind(document);

  document.createElement = function createElement(tagName, options) {
    const element = originalCreateElement(tagName, options);

    if (String(tagName).toLowerCase() !== "canvas" || element.__processingCanvasPatched) {
      return element;
    }

    element.__processingCanvasPatched = true;

    const originalGetContext = element.getContext?.bind(element);
    const originalToDataURL = element.toDataURL?.bind(element);
    const originalWidth = element.width || 300;
    const originalHeight = element.height || 150;
    let width = Number(originalWidth);
    let height = Number(originalHeight);

    Object.defineProperty(element, "width", {
      configurable: true,
      enumerable: true,
      get() {
        return width;
      },
      set(value) {
        width = Number(value) || 0;
      },
    });

    Object.defineProperty(element, "height", {
      configurable: true,
      enumerable: true,
      get() {
        return height;
      },
      set(value) {
        height = Number(value) || 0;
      },
    });

    element.getContext = function getContext(type, ...args) {
      if (type === "2d") {
        return createCanvas2DStubContext();
      }

      const context = originalGetContext ? originalGetContext(type, ...args) : null;
      return context ?? createWebGLStubContext();
    };

    element.toDataURL = function toDataURL(...args) {
      if (originalToDataURL) {
        return originalToDataURL(...args);
      }

      return "data:image/png;base64,";
    };

    element.attachEvent = function attachEvent(name, fn) {
      this.addEventListener(name.replace(/^on/, ""), fn);
    };

    element.detachEvent = function detachEvent(name, fn) {
      this.removeEventListener(name.replace(/^on/, ""), fn);
    };

    element.focus ??= () => {};
    element.blur ??= () => {};

    return element;
  };
}

function installXMLHttpRequest(window) {
  const DOMParser = window.DOMParser;

  function TestXMLHttpRequest() {
    this.async = true;
    this.headers = {};
    this.method = "GET";
    this.readyState = 0;
    this.responseText = "";
    this.status = 0;
    this.onreadystatechange = null;
    this.withCredentials = false;

    let responseXML = null;

    Object.defineProperty(this, "responseXML", {
      configurable: true,
      enumerable: true,
      get() {
        if (responseXML) {
          return responseXML;
        }

        if (!this.responseText) {
          return null;
        }

        responseXML = new DOMParser().parseFromString(this.responseText, "text/xml");
        return responseXML;
      },
      set(value) {
        responseXML = value;
      },
    });
  }

  TestXMLHttpRequest.prototype.open = function open(method, url, async = true) {
    this.method = method;
    this.url = url;
    this.async = async !== false;
    this.readyState = 1;
  };

  TestXMLHttpRequest.prototype.setRequestHeader = function setRequestHeader(name, value) {
    this.headers[name] = value;
  };

  TestXMLHttpRequest.prototype.overrideMimeType = function overrideMimeType(mimeType) {
    this.mimeType = mimeType;
  };

  TestXMLHttpRequest.prototype.send = function send() {
    const filePath = resolveRequestPath(this.url);

    try {
      if (filePath && fs.existsSync(filePath)) {
        this.responseText = fs.readFileSync(filePath, "utf8");
        if (/\.svg$|\.xml$/i.test(filePath)) {
          this.responseXML = new DOMParser().parseFromString(this.responseText, "text/xml");
        }
        this.status = 200;
      } else {
        this.responseText = "some text";
        this.responseXML = null;
        this.status = 200;
      }
    } catch {
      this.responseText = "";
      this.responseXML = null;
      this.status = 500;
    }

    this.readyState = 4;

    if (typeof this.onreadystatechange === "function") {
      this.onreadystatechange();
    }
  };

  window.XMLHttpRequest = TestXMLHttpRequest;
}

function installEventAliases(window) {
  const targets = [window, window.document];

  for (const target of targets) {
    target.attachEvent ??= function attachEvent(name, fn) {
      this.addEventListener(name.replace(/^on/, ""), fn);
    };
    target.detachEvent ??= function detachEvent(name, fn) {
      this.removeEventListener(name.replace(/^on/, ""), fn);
    };
  }
}

function createBrowserFromWindow(window) {
  window.localStorage ??= {};
  installCanvasSupport(window);
  installXMLHttpRequest(window);
  installEventAliases(window);

  return {
    isDomPresent: true,
    navigator: window.navigator,
    window,
    document: window.document,
    ajax(url) {
      const xhr = new window.XMLHttpRequest();
      xhr.open("GET", url, false);
      if (xhr.overrideMimeType) {
        xhr.overrideMimeType("text/plain");
      }
      xhr.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 1960 00:00:00 GMT");
      xhr.send(null);
      if (xhr.status !== 200 && xhr.status !== 0) {
        throw new Error(`XMLHttpRequest failed, status code ${xhr.status}`);
      }
      return xhr.responseText;
    },
  };
}

let sharedBrowser;

export function getSharedTestBrowser() {
  if (!sharedBrowser) {
    const sharedWindow =
      typeof globalThis.window !== "undefined" && globalThis.window?.document
        ? globalThis.window
        : new Window({
            url: "http://localhost/",
          });

    sharedBrowser = createBrowserFromWindow(sharedWindow);
  }

  return sharedBrowser;
}

export function createIsolatedTestBrowser() {
  return createBrowserFromWindow(
    new Window({
      url: "http://localhost/",
    }),
  );
}

export function installSharedBrowserGlobals() {
  const browser = getSharedTestBrowser();
  const globals = {
    window: browser.window,
    document: browser.document,
    navigator: browser.navigator,
    XMLHttpRequest: browser.window.XMLHttpRequest,
    DOMParser: browser.window.DOMParser,
    HTMLCanvasElement: browser.window.HTMLCanvasElement,
    HTMLImageElement: browser.window.HTMLImageElement,
    Image: browser.window.Image,
    localStorage: browser.window.localStorage,
  };

  for (const [name, value] of Object.entries(globals)) {
    Object.defineProperty(globalThis, name, {
      value,
      configurable: true,
      writable: true,
    });
  }

  return browser;
}

export function resetSharedBrowserDom() {
  const browser = getSharedTestBrowser();
  browser.document.head.innerHTML = "";
  browser.document.body.innerHTML = "";
  return browser;
}
