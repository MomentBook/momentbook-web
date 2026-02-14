#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { normalizeJourneyImportToV3, validateJourneyImportV3 } from "./journey-import-v3.mjs";

const cwd = process.cwd();
const publicRoot = path.join(cwd, "public");
const tutorialsRoot = path.join(publicRoot, "tutorials");
const excluded = new Set(["index.json"]);

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function listTutorialDirs() {
  if (!existsSync(tutorialsRoot)) {
    return [];
  }

  return readdirSync(tutorialsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function listJourneyImportFiles(tutorialDir) {
  return readdirSync(tutorialDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name === "journey-import.json")
    .filter((name) => !excluded.has(name));
}

function migrateTutorial(tutorialDir) {
  const files = listJourneyImportFiles(tutorialDir);
  if (files.length === 0) {
    return;
  }

  for (const fileName of files) {
    const filePath = path.join(tutorialDir, fileName);
    const source = readJson(filePath);
    const normalized = normalizeJourneyImportToV3(source);
    const validation = validateJourneyImportV3(normalized);

    if (!validation.isValid) {
      console.error(`Invalid after v3 migration: ${filePath}`);
      for (const error of validation.errors) {
        console.error(`  - ${error}`);
      }
      process.exitCode = 1;
      continue;
    }

    writeFileSync(filePath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
    console.log(`Migrated ${path.relative(cwd, filePath)} -> schemaVersion 3`);
  }
}

function main() {
  const tutorialDirs = listTutorialDirs();
  if (tutorialDirs.length === 0) {
    console.log("No tutorials to migrate.");
    return;
  }

  for (const slug of tutorialDirs) {
    migrateTutorial(path.join(tutorialsRoot, slug));
  }

  if (process.exitCode === 1) {
    process.exit(1);
  }
}

main();
