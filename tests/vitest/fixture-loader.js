import fs from "node:fs";
import path from "node:path";

function loadFixturePaths(rootDir, extension = ".pde") {
  const files = [];

  function visit(currentDir) {
    const entries = fs
      .readdirSync(currentDir, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
      const entryPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        visit(entryPath);
        continue;
      }

      if (entry.isFile() && entry.name.endsWith(extension)) {
        files.push(entryPath);
      }
    }
  }

  visit(rootDir);

  return files;
}

export { loadFixturePaths };
