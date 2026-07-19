import * as assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import test from 'node:test';
import { validateTemplates } from '../validate';

test('validateTemplates accepts current Codex templates', async () => {
  const result = await validateTemplates();
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

function makeValidSkillTemplate(): string {
  const source = fs.mkdtempSync(path.join(os.tmpdir(), 'jun-codex-validate-'));
  const skillDir = path.join(source, 'skills', 'Example');
  fs.mkdirSync(skillDir, { recursive: true });
  fs.writeFileSync(
    path.join(skillDir, 'SKILL.md'),
    '---\nname: Example\ndescription: Example skill.\n---\n',
  );
  return source;
}

test('validateTemplates rejects a missing global AGENTS.md', async () => {
  const source = makeValidSkillTemplate();

  const result = await validateTemplates(source);

  assert.equal(result.valid, false);
  assert.match(result.errors.join('\n'), /Missing global AGENTS\.md/);
});

test('validateTemplates rejects an empty global AGENTS.md', async () => {
  const source = makeValidSkillTemplate();
  fs.writeFileSync(path.join(source, 'AGENTS.md'), '');

  const result = await validateTemplates(source);

  assert.equal(result.valid, false);
  assert.match(result.errors.join('\n'), /Empty global AGENTS\.md/);
});
