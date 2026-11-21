import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const name = process.argv[2];
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const classStem = classify(name);
const componentClass = `Noah${classStem}Component`;
const folder = resolve(root, 'projects/ui/src/lib', name);
const componentPath = resolve(folder, `${name}.component.ts`);
const publicApiPath = resolve(root, 'projects/ui/src/public-api.ts');

if (!name || !/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(name)) {
  console.error('請用小寫名字。例如：npm run component header');
  process.exit(1);
}

if (existsSync(folder)) {
  console.error(`${name} 已經存在。`);
  process.exit(1);
}

const generated = spawnSync(process.execPath, [
  resolve(root, 'node_modules/@angular/cli/bin/ng.js'),
  'generate',
  'component',
  name,
  '--project',
  'ui',
], { cwd: root, stdio: 'inherit' });

if (generated.status !== 0) {
  process.exit(generated.status ?? 1);
}

const componentSource = readFileSync(componentPath, 'utf8')
  .replace(`export class ${classStem}Component`, `export class ${componentClass}`);
writeFileSync(componentPath, componentSource);

const exportLine = `export { ${componentClass} } from './lib/${name}/${name}.component';\n`;
const publicApi = readFileSync(publicApiPath, 'utf8');
if (!publicApi.includes(exportLine.trim())) {
  writeFileSync(publicApiPath, publicApi.endsWith('\n') ? publicApi + exportLine : `${publicApi}\n${exportLine}`);
}

writeFileSync(resolve(folder, `${name}.stories.ts`), `import type { Meta, StoryObj } from '@storybook/angular';
import { ${componentClass} } from './${name}.component';

const meta: Meta<${componentClass}> = {
  title: '${classStem}',
  component: ${componentClass},
  render: () => ({
    template: \`<noah-${name}></noah-${name}>\`,
  }),
};

export default meta;
type Story = StoryObj<${componentClass}>;

export const Default: Story = {};
`);

console.log(`已建立 noah-${name}，並寫進 public-api.ts。`);

function classify(value) {
  return value.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}
