import * as assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import test from 'node:test';
import { collectTemplateFiles, isManagedTemplateFile } from '../template-files';

test('collectTemplateFiles includes global AGENTS.md and skill files only', () => {
  const source = fs.mkdtempSync(path.join(os.tmpdir(), 'jun-codex-templates-'));
  fs.mkdirSync(path.join(source, 'skills', 'Git'), { recursive: true });
  fs.writeFileSync(path.join(source, 'AGENTS.md'), 'global instructions');
  fs.writeFileSync(path.join(source, 'skills', 'Git', 'SKILL.md'), 'skill');
  fs.writeFileSync(path.join(source, 'README.md'), 'not managed');

  assert.deepEqual(collectTemplateFiles(source), [
    'AGENTS.md',
    path.join('skills', 'Git', 'SKILL.md'),
  ]);
});

test('isManagedTemplateFile accepts AGENTS.md and skills only', () => {
  assert.equal(isManagedTemplateFile('AGENTS.md'), true);
  assert.equal(isManagedTemplateFile('skills/Git/SKILL.md'), true);
  assert.equal(isManagedTemplateFile('README.md'), false);
});
