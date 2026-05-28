import * as fs from 'fs';
import * as path from 'path';
import { getAllFiles, hasFrontmatterField, readText } from './utils';
import { getSourceGlobalDir } from './copy';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

function validateSkill(skillDir: string, errors: string[]): void {
  const skillMd = path.join(skillDir, 'SKILL.md');
  if (!fs.existsSync(skillMd)) {
    errors.push(`Missing SKILL.md: ${skillDir}`);
    return;
  }

  const content = readText(skillMd);
  if (!hasFrontmatterField(content, 'name')) {
    errors.push(`Missing frontmatter name: ${skillMd}`);
  }
  if (!hasFrontmatterField(content, 'description')) {
    errors.push(`Missing frontmatter description: ${skillMd}`);
  }

  const referenceLinks: string[] = [];
  const referencePattern = /\]\((references\/[^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = referencePattern.exec(content)) !== null) {
    referenceLinks.push(match[1]);
  }
  for (const link of referenceLinks) {
    const refPath = path.join(skillDir, link);
    if (!fs.existsSync(refPath)) {
      errors.push(`Broken reference link: ${path.join(skillDir, link)}`);
    }
  }
}

export async function validateTemplates(): Promise<ValidationResult> {
  const sourceDir = getSourceGlobalDir();
  const errors: string[] = [];

  if (!fs.existsSync(sourceDir)) {
    errors.push(`Missing templates/global directory: ${sourceDir}`);
  } else {
    for (const unsupported of ['commands', 'agents', 'hooks']) {
      if (fs.existsSync(path.join(sourceDir, unsupported))) {
        errors.push(`Unsupported Codex template directory found: ${unsupported}`);
      }
    }

    const skillsDir = path.join(sourceDir, 'skills');
    if (!fs.existsSync(skillsDir)) {
      errors.push(`Missing skills directory: ${skillsDir}`);
    } else {
      const skillDirs = fs.readdirSync(skillsDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(skillsDir, entry.name));

      if (skillDirs.length === 0) {
        errors.push('No skills found in templates/global/skills');
      }

      for (const skillDir of skillDirs) {
        validateSkill(skillDir, errors);
      }
    }

    const files = getAllFiles(sourceDir);
    for (const file of files) {
      if (file.startsWith('commands/') || file.startsWith('agents/') || file.startsWith('hooks/')) {
        errors.push(`Unsupported Codex template file found: ${file}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error('Validation failed:');
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    return { valid: false, errors };
  }

  console.log('Validation passed.');
  return { valid: true, errors: [] };
}
