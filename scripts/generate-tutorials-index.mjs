#!/usr/bin/env node

import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const publicRoot = path.join(cwd, "public");
const tutorialsRoot = path.join(publicRoot, "tutorials");
const outputPath = path.join(tutorialsRoot, "index.json");
const excludedTutorialSlugs = new Set(["sample"]);

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

function toWebPath(relativeFromPublic) {
  return `/${toPosixPath(relativeFromPublic)}`;
}

function safeReadJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function listTutorialDirectories() {
  if (!existsSync(tutorialsRoot)) {
    return [];
  }

  return readdirSync(tutorialsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !excludedTutorialSlugs.has(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function listTopLevelFiles(tutorialDir) {
  return readdirSync(tutorialDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function listMediaFilesByArchivePath(tutorialDir, photos) {
  const mediaPaths = [];
  for (const photo of photos) {
    const archivePath = typeof photo?.archivePath === "string"
      ? photo.archivePath.trim()
      : "";
    if (!archivePath) {
      continue;
    }

    const absolutePath = path.join(tutorialDir, archivePath);
    if (existsSync(absolutePath) && statSync(absolutePath).isFile()) {
      mediaPaths.push(toPosixPath(archivePath));
    }
  }

  return Array.from(new Set(mediaPaths)).sort((a, b) => a.localeCompare(b));
}

function groupMediaFiles(mediaFiles) {
  const byFolder = new Map();
  for (const mediaFile of mediaFiles) {
    const folderName = path.posix.dirname(mediaFile);
    const fileName = path.posix.basename(mediaFile);
    if (!byFolder.has(folderName)) {
      byFolder.set(folderName, []);
    }
    byFolder.get(folderName).push(fileName);
  }

  return Array.from(byFolder.entries())
    .map(([folderName, files]) => ({
      folderName,
      files: files.sort((a, b) => a.localeCompare(b)),
    }))
    .sort((a, b) => a.folderName.localeCompare(b.folderName));
}

function buildTutorialEntry(slug) {
  const tutorialDir = path.join(tutorialsRoot, slug);
  const journeyImportPath = path.join(tutorialDir, "journey-import.json");
  const indexHtmlPath = path.join(tutorialDir, "index.html");
  const journeyImport = safeReadJson(journeyImportPath);
  const photos = Array.isArray(journeyImport?.photos)
    ? journeyImport.photos
    : [];
  const timeline = Array.isArray(journeyImport?.timeline)
    ? journeyImport.timeline
    : [];
  const mediaFiles = listMediaFilesByArchivePath(tutorialDir, photos);
  const groupedFolders = groupMediaFiles(mediaFiles);
  const topLevelFiles = listTopLevelFiles(tutorialDir);
  const coverRelativePath = mediaFiles[0] ?? null;

  return {
    slug,
    path: `/tutorials/${slug}`,
    title:
      journeyImport?.journey?.title ??
      journeyImport?.journey?.metadata?.title ??
      slug,
    schemaVersion:
      typeof journeyImport?.schemaVersion === "number"
        ? journeyImport.schemaVersion
        : null,
    exportedAt:
      typeof journeyImport?.exportedAt === "string"
        ? journeyImport.exportedAt
        : null,
    indexHtml: existsSync(indexHtmlPath) ? `/tutorials/${slug}/index.html` : null,
    journeyImport: existsSync(journeyImportPath)
      ? `/tutorials/${slug}/journey-import.json`
      : null,
    timelineCount: timeline.length,
    photoCount: photos.length,
    mediaFileCount: mediaFiles.length,
    coverPath: coverRelativePath
      ? `/tutorials/${slug}/${coverRelativePath}`
      : null,
    topLevelFiles: topLevelFiles.map((name) =>
      toWebPath(path.join("tutorials", slug, name)),
    ),
    folders: groupedFolders.map((folder) => ({
      name: folder.folderName,
      path: `/tutorials/${slug}/${folder.folderName}`,
      fileCount: folder.files.length,
      files: folder.files.map((fileName) => ({
        name: fileName,
        path: `/tutorials/${slug}/${folder.folderName}/${fileName}`,
      })),
    })),
  };
}

function main() {
  const tutorials = listTutorialDirectories().map(buildTutorialEntry);
  const output = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    tutorials,
  };

  writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`Generated ${path.relative(cwd, outputPath)} (${tutorials.length} tutorials).`);
}

main();
