import * as fs from 'fs';
import * as path from 'path';
import { getFileHash } from './utils';

export interface FileMetadata {
  hash: string;
}

export interface InstalledMetadata {
  version: string;
  installedAt: string;
  files: Record<string, FileMetadata>;
}

export const METADATA_FILENAME = '.jun-codex-installed.json';

export function getMetadataPath(destDir: string): string {
  return path.join(destDir, METADATA_FILENAME);
}

export function loadMetadata(destDir: string): InstalledMetadata | null {
  const metaPath = getMetadataPath(destDir);
  if (!fs.existsSync(metaPath)) return null;

  try {
    return JSON.parse(fs.readFileSync(metaPath, 'utf-8')) as InstalledMetadata;
  } catch {
    return null;
  }
}

export function saveMetadata(destDir: string, metadata: InstalledMetadata): void {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.writeFileSync(getMetadataPath(destDir), JSON.stringify(metadata, null, 2) + '\n', 'utf-8');
}

export function buildMetadata(
  files: string[],
  sourceDir: string,
  version: string,
): InstalledMetadata {
  const entries: Record<string, FileMetadata> = {};

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    if (fs.existsSync(sourcePath)) {
      entries[file] = { hash: getFileHash(sourcePath) };
    }
  }

  return {
    version,
    installedAt: new Date().toISOString(),
    files: entries,
  };
}

export function mergeMetadata(
  existing: InstalledMetadata | null,
  files: string[],
  sourceDir: string,
  version: string,
): InstalledMetadata {
  const next = buildMetadata(files, sourceDir, version);
  if (!existing) return next;

  return {
    version,
    installedAt: new Date().toISOString(),
    files: {
      ...existing.files,
      ...next.files,
    },
  };
}
