import { afterEach, beforeEach } from "vite-plus/test";

import { installSharedBrowserGlobals, resetSharedBrowserDom } from "../unit/helpers/test-browser.js";

installSharedBrowserGlobals();

beforeEach(() => {
  resetSharedBrowserDom();
});

afterEach(() => {
  resetSharedBrowserDom();
});
