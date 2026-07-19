import * as assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import test from 'node:test';
import { copyCodexFiles } from '../copy';
import { loadMetadata } from '../metadata';
import { updateCodexFiles } from '../update';

test('install manages global AGENTS.md and update preserves customization', async () => {
  const destination = fs.mkdtempSync(path.join(os.tmpdir(), 'jun-codex-install-'));
  const previousCodexHome = process.env.CODEX_HOME;
  process.env.CODEX_HOME = destination;

  try {
    const result = await copyCodexFiles();
    const agentsPath = path.join(destination, 'AGENTS.md');
    const metadata = loadMetadata(destination);

    assert.equal(result.copiedFiles.includes('AGENTS.md'), true);
    assert.equal(fs.existsSync(agentsPath), true);
    assert.ok(metadata?.files['AGENTS.md']);

    fs.writeFileSync(agentsPath, '# Customized AGENTS.md\n');
    await updateCodexFiles();

    assert.equal(fs.readFileSync(agentsPath, 'utf-8'), '# Customized AGENTS.md\n');
  } finally {
    if (previousCodexHome === undefined) {
      delete process.env.CODEX_HOME;
    } else {
      process.env.CODEX_HOME = previousCodexHome;
    }
  }
});
