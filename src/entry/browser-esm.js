import { createProcessing } from "./index.js";

export const Processing =
  typeof window !== "undefined"
    ? createProcessing({
        isDomPresent: true,
        navigator,
        window,
        document,
        ajax(url) {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain");
          }
          xhr.setRequestHeader(
            "If-Modified-Since",
            "Fri, 01 Jan 1960 00:00:00 GMT",
          );
          xhr.send(null);
          if (xhr.status !== 200 && xhr.status !== 0) {
            throw new Error(
              `XMLHttpRequest failed, status code ${xhr.status}`,
            );
          }
          return xhr.responseText;
        },
      })
    : null;
