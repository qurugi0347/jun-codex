import * as fs from 'fs';
import * as path from 'path';
import { copyFile, ensureDir, getAllFiles, getFileHash } from './utils';
import { loadMetadata, mergeMetadata, saveMetadata } from './metadata';

export interface CopyOptions {
  dryRun?: boolean;
  force?: boolean;
}

export type FileStatus = 'new' | 'changed' | 'unchanged';

export interface CopyResult {
  destination: string;
  copiedFiles: string[];
  skippedFiles: string[];
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json') as { version: string };

export function getCodexHome(): string {
  if (process.env.CODEX_HOME) return process.env.CODEX_HOME;

  const homeDir = process.env.HOME || process.env.USERPROFILE;
  if (!homeDir) {
    throw new Error('Could not determine home directory');
  }
  return path.join(homeDir, '.codex');
}

export function getSourceGlobalDir(): string {
  return path.resolve(__dirname, '..', 'templates', 'global');
}

export function getFileStatus(sourcePath: string, destPath: string): FileStatus {
  if (!fs.existsSync(destPath)) return 'new';
  return getFileHash(sourcePath) === getFileHash(destPath) ? 'unchanged' : 'changed';
}

function statusBracket(status: FileStatus): string {
  switch (status) {
    case 'new':
      return '[new]';
    case 'changed':
      return '[changed]';
    case 'unchanged':
      return '[unchanged]';
  }
}

function collectTemplateFiles(sourceDir: string): string[] {
  return getAllFiles(sourceDir).filter((file) => file.startsWith('skills/'));
}

export async function copyCodexFiles(options: CopyOptions = {}): Promise<CopyResult> {
  const { dryRun = false, force = false } = options;
  const sourceDir = getSourceGlobalDir();
  const destDir = getCodexHome();

  console.log('Source:', sourceDir);
  console.log('Destination:', destDir);
  console.log();

  if (!fs.existsSync(sourceDir)) {
    throw new Error('Source templates/global directory not found');
  }

  const files = collectTemplateFiles(sourceDir);
  if (files.length === 0) {
    console.log('No Codex skill files found.');
    return { destination: destDir, copiedFiles: [], skippedFiles: [] };
  }

  if (dryRun) {
    console.log('[DRY RUN] Files that would be installed:');
    for (const file of files) {
      const status = getFileStatus(path.join(sourceDir, file), path.join(destDir, file));
      console.log(`  ${statusBracket(status)} ${file}`);
    }
    console.log();
    console.log('No files were copied.');
    return { destination: destDir, copiedFiles: [], skippedFiles: files };
  }

  ensureDir(destDir);

  const copiedFiles: string[] = [];
  const skippedFiles: string[] = [];

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    const status = getFileStatus(sourcePath, destPath);

    if (!force && status === 'unchanged') {
      skippedFiles.push(file);
      console.log(`  [skip] ${file}`);
      continue;
    }

    if (!force && status === 'changed') {
      skippedFiles.push(file);
      console.log(`  [skip customized] ${file}`);
      continue;
    }

    copyFile(sourcePath, destPath);
    copiedFiles.push(file);
    console.log(`  ${status === 'new' ? '[created]' : '[overwritten]'} ${file}`);
  }

  const metadata = mergeMetadata(loadMetadata(destDir), copiedFiles, sourceDir, version);
  saveMetadata(destDir, metadata);

  console.log();
  console.log(`Done. Installed ${copiedFiles.length} file(s), skipped ${skippedFiles.length}.`);

  return { destination: destDir, copiedFiles, skippedFiles };
}
