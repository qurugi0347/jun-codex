import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

export function getFileHash(filePath: string): string {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

export function getAllFiles(dirPath: string, basePath: string = dirPath): string[] {
  if (!fs.existsSync(dirPath)) return [];

  const files: string[] = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath, basePath));
    } else {
      files.push(path.relative(basePath, fullPath));
    }
  }

  return files.sort();
}

export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function copyFile(src: string, dest: string): void {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

export function readText(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

export function hasFrontmatterField(content: string, field: string): boolean {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return false;
  const lines = match[1].split('\n');
  return lines.some((line) => new RegExp(`^${field}:\\s*\\S+`).test(line.trim()));
}

export function relativeDisplay(filePath: string): string {
  return filePath.split(path.sep).join('/');
}
