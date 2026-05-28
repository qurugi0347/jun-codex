import * as assert from 'node:assert/strict';
import test from 'node:test';
import { validateTemplates } from '../validate';

test('validateTemplates accepts current Codex templates', async () => {
  const result = await validateTemplates();
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});
