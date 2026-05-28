import * as assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import test from 'node:test';
import { buildMetadata } from '../metadata';
import { computeUpdateStatus } from '../update';

function makeDirs(): { source: string; dest: string; file: string } {
  const source = fs.mkdtempSync(path.join(os.tmpdir(), 'jun-codex-source-'));
  const dest = fs.mkdtempSync(path.join(os.tmpdir(), 'jun-codex-dest-'));
  const file = 'skills/Git/SKILL.md';
  fs.mkdirSync(path.join(source, 'skills', 'Git'), { recursive: true });
  fs.mkdirSync(path.join(dest, 'skills', 'Git'), { recursive: true });
  return { source, dest, file };
}

test('computeUpdateStatus returns update-available when only template changed', () => {
  const { source, dest, file } = makeDirs();
  fs.writeFileSync(path.join(source, file), 'base');
  fs.writeFileSync(path.join(dest, file), 'base');
  const metadata = buildMetadata([file], source, '1.0.0');

  fs.writeFileSync(path.join(source, file), 'new');

  assert.equal(computeUpdateStatus(file, source, dest, metadata), 'update-available');
});

test('computeUpdateStatus returns user-modified when only destination changed', () => {
  const { source, dest, file } = makeDirs();
  fs.writeFileSync(path.join(source, file), 'base');
  fs.writeFileSync(path.join(dest, file), 'base');
  const metadata = buildMetadata([file], source, '1.0.0');

  fs.writeFileSync(path.join(dest, file), 'custom');

  assert.equal(computeUpdateStatus(file, source, dest, metadata), 'user-modified');
});

test('computeUpdateStatus returns conflict when template and destination both changed', () => {
  const { source, dest, file } = makeDirs();
  fs.writeFileSync(path.join(source, file), 'base');
  fs.writeFileSync(path.join(dest, file), 'base');
  const metadata = buildMetadata([file], source, '1.0.0');

  fs.writeFileSync(path.join(source, file), 'new');
  fs.writeFileSync(path.join(dest, file), 'custom');

  assert.equal(computeUpdateStatus(file, source, dest, metadata), 'conflict');
});
