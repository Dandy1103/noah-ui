import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const levels = ['patch', 'minor', 'major'];
const level = process.argv[2];
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packagePath = resolve(root, 'projects/ui/package.json');

if (!levels.includes(level)) {
  console.error('請指定 patch、minor 或 major。例如：npm run publish patch');
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
const previousVersion = packageJson.version;
packageJson.version = nextVersion(previousVersion, level);
writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

console.log(`版本改為 ${packageJson.version}，開始打包。`);

const built = runNpm(['run', 'build']);
if (!built) {
  restoreVersion();
  process.exit(1);
}

const published = runNpm(['publish', './dist/ui', '--userconfig', '.npmrc']);
if (!published) {
  restoreVersion();
  process.exit(1);
}

console.log(`已發布 ${packageJson.name}@${packageJson.version}`);

function nextVersion(version, release) {
  const parts = version.split('.').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    console.error(`版本格式必須是 x.y.z，目前是 ${version}`);
    process.exit(1);
  }

  const [major, minor, patch] = parts;
  if (release === 'major') {
    return `${major + 1}.0.0`;
  }
  if (release === 'minor') {
    return `${major}.${minor + 1}.0`;
  }
  return `${major}.${minor}.${patch + 1}`;
}

function restoreVersion() {
  packageJson.version = previousVersion;
  writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
}

function runNpm(args) {
  const npmCli = process.env.npm_execpath;
  const result = npmCli
    ? spawnSync(process.execPath, [npmCli, ...args], { cwd: root, stdio: 'inherit' })
    : spawnSync('npm', args, { cwd: root, stdio: 'inherit', shell: true });

  if (result.error) {
    console.error(result.error.message);
  }
  return result.status === 0;
}
