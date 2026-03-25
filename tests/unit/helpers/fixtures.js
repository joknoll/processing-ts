import fs from "node:fs";
import path from "node:path";

function readFixture(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

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

function loadFixtureCases(rootDir, extension = ".pde") {
  return loadFixturePaths(rootDir, extension).map((filePath) => ({
    filePath,
    name: path.relative(rootDir, filePath).split(path.sep).join("/"),
  }));
}

export { loadFixtureCases, loadFixturePaths, readFixture };
