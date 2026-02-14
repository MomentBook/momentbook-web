import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { normalizeJourneyImportToV3, validateJourneyImportV3 } from "../journey-import-v3.mjs";

const cwd = process.cwd();
const samplePath = path.join(cwd, "public/tutorials/sample/journey-import.json");
const jejuPath = path.join(cwd, "public/tutorials/jeju-island/journey-import.json");

function readFixture(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function loadFixture(pathName) {
  return normalizeJourneyImportToV3(readFixture(pathName));
}

test("sample and jeju fixture pass journey-import v3 validation", () => {
  const sample = loadFixture(samplePath);
  const jeju = loadFixture(jejuPath);

  assert.equal(validateJourneyImportV3(sample).isValid, true);
  assert.equal(validateJourneyImportV3(jeju).isValid, true);
});

test("top-level photos photoId must be unique", () => {
  const fixture = loadFixture(samplePath);
  fixture.photos.push({
    ...fixture.photos[0],
    archivePath: "duplicate.jpg",
  });

  const result = validateJourneyImportV3(fixture);
  assert.equal(result.isValid, false);
  assert.match(result.errors[0], /Duplicate photoId/);
});

test("top-level timeline photoIds must all reference existing photos", () => {
  const fixture = loadFixture(samplePath);
  fixture.timeline[0].photoIds.push("does-not-exist");

  const result = validateJourneyImportV3(fixture);
  assert.equal(result.isValid, false);
  assert.match(result.errors[0], /not found in photos/);
});

test("recap.photoIdSpace must be EXTERNAL_ID", () => {
  const fixture = loadFixture(samplePath);
  fixture.recap.photoIdSpace = "LOCAL_ID";

  const result = validateJourneyImportV3(fixture);
  assert.equal(result.isValid, false);
  assert.match(result.errors[0], /EXTERNAL_ID/);
});

test("schema and format must match v3 contract", () => {
  const fixture = loadFixture(samplePath);
  fixture.schemaVersion = 2;
  fixture.format = "legacy";

  const result = validateJourneyImportV3(fixture);
  assert.equal(result.isValid, false);
  assert.match(result.errors.join("\n"), /schemaVersion must be 3/);
  assert.match(result.errors.join("\n"), /format must be momentbook\.journey-archive/);
});

test("recap.draft.photos must reference existing photo IDs", () => {
  const fixture = loadFixture(samplePath);
  fixture.recap.draft.photos[0].photoId = "not-existing-photo";

  const result = validateJourneyImportV3(fixture);
  assert.equal(result.isValid, false);
  assert.match(result.errors[0], /not found in photos/);
});

test("recap.draft.timeline photoIds must reference existing photo IDs", () => {
  const fixture = loadFixture(samplePath);
  fixture.recap.draft.timeline[0].photoIds[0] = "not-existing-photo";

  const result = validateJourneyImportV3(fixture);
  assert.equal(result.isValid, false);
  assert.match(result.errors[0], /not found in photos/);
});

test("recap.overrides references must point to existing photo IDs", () => {
  const fixture = loadFixture(samplePath);
  fixture.recap.overrides.hiddenPhotoIds.push("not-existing-photo");
  fixture.recap.overrides.manualAssignments.push({
    photoId: "not-existing-photo",
    targetClusterId: "cluster-1",
  });

  const result = validateJourneyImportV3(fixture);
  assert.equal(result.isValid, false);
  assert.match(result.errors[0], /not found in photos/);
});

test("media.includedPhotoCount must equal photos.length when no skips", () => {
  const fixture = loadFixture(samplePath);
  fixture.media.includedPhotoCount = fixture.photos.length - 1;

  const result = validateJourneyImportV3(fixture);
  assert.equal(result.isValid, false);
  assert.match(result.errors[0], /includedPhotoCount must equal photos.length/);
});
