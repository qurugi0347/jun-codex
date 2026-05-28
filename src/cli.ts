#!/usr/bin/env node

import { copyCodexFiles } from './copy';
import { updateCodexFiles } from './update';
import { validateTemplates } from './validate';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json') as { version: string };

interface ParsedArgs {
  command: 'install' | 'update' | 'validate' | 'help' | 'version';
  dryRun: boolean;
  force: boolean;
}

function printHelp(): void {
  console.log(`jun-codex ${version}

Install Codex skills into $CODEX_HOME or ~/.codex.

Usage:
  jun-codex [--dry-run] [--force]
  jun-codex update [--dry-run] [--force]
  jun-codex validate

Options:
  -d, --dry-run   Preview changes without writing files
  -f, --force     Overwrite existing customized files
  -h, --help      Show help
  -v, --version   Show version
`);
}

function parseArgs(argv: string[]): ParsedArgs {
  let command: ParsedArgs['command'] = 'install';
  let dryRun = false;
  let force = false;

  for (const arg of argv) {
    switch (arg) {
      case 'update':
        command = 'update';
        break;
      case 'validate':
        command = 'validate';
        break;
      case '--dry-run':
      case '-d':
        dryRun = true;
        break;
      case '--force':
      case '-f':
        force = true;
        break;
      case '--help':
      case '-h':
        command = 'help';
        break;
      case '--version':
      case '-v':
        command = 'version';
        break;
      default:
        throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return { command, dryRun, force };
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  switch (args.command) {
    case 'install':
      await copyCodexFiles({ dryRun: args.dryRun, force: args.force });
      return;
    case 'update':
      await updateCodexFiles({ dryRun: args.dryRun, force: args.force });
      return;
    case 'validate': {
      const result = await validateTemplates();
      if (!result.valid) process.exit(1);
      return;
    }
    case 'help':
      printHelp();
      return;
    case 'version':
      console.log(version);
      return;
  }
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
  process.exit(1);
});
