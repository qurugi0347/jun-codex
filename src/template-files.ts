import * as path from 'path';
import { getAllFiles } from './utils';

export function isManagedTemplateFile(file: string): boolean {
  const normalizedFile = file.split(path.sep).join('/');
  return normalizedFile === 'AGENTS.md' || normalizedFile.startsWith('skills/');
}

export function collectTemplateFiles(sourceDir: string): string[] {
  return getAllFiles(sourceDir).filter(isManagedTemplateFile);
}
