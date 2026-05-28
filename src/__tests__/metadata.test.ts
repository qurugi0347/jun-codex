import * as assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import test from 'node:test';
import { buildMetadata, loadMetadata, saveMetadata } from '../metadata';

test('saveMetadata and loadMetadata round-trip installed metadata', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'jun-codex-meta-'));
  const source = fs.mkdtempSync(path.join(os.tmpdir(), 'jun-codex-source-'));
  fs.mkdirSync(path.join(source, 'skills', 'Git'), { recursive: true });
  fs.writeFileSync(path.join(source, 'skills', 'Git', 'SKILL.md'), 'content');

  const metadata = buildMetadata(['skills/Git/SKILL.md'], source, '1.0.0');
  saveMetadata(dir, metadata);

  assert.deepEqual(loadMetadata(dir), metadata);
});
