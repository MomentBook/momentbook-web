#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { normalizeJourneyImportToV3, validateJourneyImportV3 } from "./journey-import-v3.mjs";

const cwd = process.cwd();
const publicRoot = path.join(cwd, "public");
const tutorialsRoot = path.join(publicRoot, "tutorials");

function safeReadJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function listTutorialDirs() {
  if (!existsSync(tutorialsRoot)) {
    return [];
  }

  return readdirSync(tutorialsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => name !== "sample")
    .sort((a, b) => a.localeCompare(b));
}

function listJourneyImportFiles(tutorialDir) {
  return readdirSync(tutorialDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name === "journey-import.json");
}

function validatePath(journeyImportPath, outputV3 = false) {
  const source = safeReadJson(journeyImportPath);
  if (!source) {
    throw new Error(`Cannot parse JSON: ${journeyImportPath}`);
  }

  const candidate = outputV3 ? normalizeJourneyImportToV3(source) : source;
  const result = validateJourneyImportV3(candidate);
  return { candidate, result };
}

function main() {
  const tutorialSlugs = listTutorialDirs();
  let failed = false;
  let checked = 0;
  let passed = 0;

  for (const slug of tutorialSlugs) {
    const tutorialDir = path.join(tutorialsRoot, slug);
    const journeyImportFiles = listJourneyImportFiles(tutorialDir);

    for (const fileName of journeyImportFiles) {
      const filePath = path.join(tutorialDir, fileName);
      checked += 1;

      try {
        const { result } = validatePath(filePath, true);
        if (result.isValid) {
          passed += 1;
          console.log(`OK: ${filePath}`);
        } else {
          failed = true;
          console.log(`FAIL: ${filePath}`);
          for (const error of result.errors) {
            console.log(`  - ${error}`);
          }
        }
      } catch (error) {
        failed = true;
        console.log(`ERROR: ${filePath}`);
        console.log(`  - ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }
  }

  console.log(`Checked ${checked} file(s), passed ${passed}.`);
  if (failed) {
    process.exit(1);
  }
}

main();
