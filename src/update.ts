import * as fs from 'fs';
import * as path from 'path';
import { copyFile, getFileHash } from './utils';
import { getCodexHome, getSourceGlobalDir } from './copy';
import { collectTemplateFiles, isManagedTemplateFile } from './template-files';
import {
  InstalledMetadata,
  loadMetadata,
  mergeMetadata,
  saveMetadata,
} from './metadata';

export type UpdateFileStatus =
  | 'update-available'
  | 'user-modified'
  | 'conflict'
  | 'new-file'
  | 'unchanged'
  | 'removed-upstream';

export interface UpdateOptions {
  dryRun?: boolean;
  force?: boolean;
}

interface FileUpdateInfo {
  file: string;
  status: UpdateFileStatus;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json') as { version: string };

export function computeUpdateStatus(
  file: string,
  sourceDir: string,
  destDir: string,
  metadata: InstalledMetadata | null,
): UpdateFileStatus {
  const sourcePath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);
  const newHash = getFileHash(sourcePath);
  const baseHash = metadata?.files[file]?.hash ?? null;
  const currentExists = fs.existsSync(destPath);
  const currentHash = currentExists ? getFileHash(destPath) : null;

  if (!baseHash) {
    if (!currentExists) return 'new-file';
    if (currentHash === newHash) return 'unchanged';
    return 'user-modified';
  }

  if (!currentExists) return 'new-file';
  if (baseHash === currentHash && currentHash === newHash) return 'unchanged';
  if (baseHash === currentHash) return 'update-available';
  if (baseHash === newHash) return 'user-modified';
  return 'conflict';
}

function statusBracket(status: UpdateFileStatus): string {
  switch (status) {
    case 'update-available':
      return '[update]';
    case 'user-modified':
      return '[customized]';
    case 'conflict':
      return '[conflict]';
    case 'new-file':
      return '[new]';
    case 'unchanged':
      return '[unchanged]';
    case 'removed-upstream':
      return '[removed]';
  }
}

export async function updateCodexFiles(options: UpdateOptions = {}): Promise<void> {
  const { dryRun = false, force = false } = options;
  const sourceDir = getSourceGlobalDir();
  const destDir = getCodexHome();
  const metadata = loadMetadata(destDir);

  if (!fs.existsSync(sourceDir)) {
    throw new Error('Source templates/global directory not found');
  }

  const files = collectTemplateFiles(sourceDir);
  const fileStatuses: FileUpdateInfo[] = files.map((file) => ({
    file,
    status: computeUpdateStatus(file, sourceDir, destDir, metadata),
  }));

  if (metadata) {
    for (const file of Object.keys(metadata.files)) {
      if (!files.includes(file) && isManagedTemplateFile(file)) {
        fileStatuses.push({ file, status: 'removed-upstream' });
      }
    }
  }

  console.log(`Update Summary (${metadata?.version ?? 'unknown'} -> ${version})`);
  console.log('Destination:', destDir);
  console.log();

  for (const info of fileStatuses) {
    console.log(`  ${statusBracket(info.status)} ${info.file}`);
  }

  const actionable = fileStatuses.filter((info) =>
    ['update-available', 'new-file', 'user-modified', 'conflict'].includes(info.status),
  );

  if (actionable.length === 0) {
    console.log();
    console.log('Everything is up to date.');
    return;
  }

  if (dryRun) {
    console.log();
    console.log('No files were changed.');
    return;
  }

  if (!metadata && !force) {
    console.log();
    console.log('No installation metadata found. Existing files are preserved unless --force is used.');
  }

  const filesToCopy = actionable
    .filter((info) => force || info.status === 'update-available' || info.status === 'new-file')
    .map((info) => info.file);

  for (const file of filesToCopy) {
    copyFile(path.join(sourceDir, file), path.join(destDir, file));
    console.log(`  [written] ${file}`);
  }

  const updatedMetadata = mergeMetadata(metadata, filesToCopy, sourceDir, version);
  for (const info of fileStatuses) {
    if (info.status === 'unchanged' && fs.existsSync(path.join(sourceDir, info.file))) {
      updatedMetadata.files[info.file] = { hash: getFileHash(path.join(sourceDir, info.file)) };
    }
  }
  saveMetadata(destDir, updatedMetadata);

  console.log();
  console.log(`Done. Updated ${filesToCopy.length} file(s).`);
}
