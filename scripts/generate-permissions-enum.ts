import fs from 'fs';
import path from 'path';
import { modules } from '../prisma/seeders/modules';

type ModuleConfig = {
  actions: string[];
  description: string;
  actionDescriptions: Record<string, string>;
};

function toModuleKey(name: string) {
  return name.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
}

function toActionKey(name: string) {
  return name.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
}

function generatePermissionConstant() {
  const lines: string[] = [];

  lines.push('// AUTO-GENERATED FILE — DO NOT EDIT MANUALLY');
  lines.push('// Run `npm run gen:permissions` to regenerate.\n');

  lines.push('export const PERMISSION = {');

  for (const [moduleName, cfg] of Object.entries(modules)) {
    const config = cfg as ModuleConfig; // 👈 FIX 1: strong typing
    const moduleKey = toModuleKey(moduleName);

    lines.push(`  ${moduleKey}: {`);

    for (const action of config.actions) {
      const actionKey = toActionKey(action);

      const description =
        (config.actionDescriptions as Record<string, string>)[action] ?? ''; // 👈 FIX 2

      lines.push(`    /** ${description} */`);
      lines.push(`    ${actionKey}: '${moduleName}.${action}',`);
    }

    lines.push('  },');
  }

  lines.push('} as const;\n');

  // exported union type
  lines.push(`export type PermissionKey = {
  [M in keyof typeof PERMISSION]: (typeof PERMISSION)[M][keyof (typeof PERMISSION)[M]];
}[keyof typeof PERMISSION];\n`);

  return lines.join('\n');
}

function writeOutput() {
  const outputPath = path.resolve(
    process.cwd(),
    'src/common/constants/permissions.constant.ts',
  );

  const content = generatePermissionConstant();

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content);

  console.log('✔ Generated:', outputPath);
}

writeOutput();
