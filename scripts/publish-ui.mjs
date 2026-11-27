import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const levels = ['patch', 'minor', 'major'];
const [level, ...options] = process.argv.slice(2);
const dryRun = options[0] === '--dry-run';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packagePath = resolve(root, 'projects/ui/package.json');

if (!levels.includes(level) || options.length > (dryRun ? 1 : 0)) {
  console.error('用法：npm run publish -- <patch|minor|major> [--dry-run]');
  process.exit(1);
}

const originalManifest = readFileSync(packagePath, 'utf8');
const packageJson = JSON.parse(originalManifest);
const previousVersion = packageJson.version;
const registry = packageJson.publishConfig.registry;
const lookup = runNpm(['view', packageJson.name, 'version', '--json', '--registry', registry, '--userconfig', '.npmrc'], true);
if (lookup.status !== 0) process.exit(1);
const publishedVersion = JSON.parse(lookup.stdout);
const sourceIsBehind = compareVersions(previousVersion, publishedVersion) < 0;
if (sourceIsBehind && !dryRun) {
  console.error(`原始碼的版本 ${previousVersion} 低於已發布的 ${publishedVersion}。請先同步已發布版本的原始碼與 package.json。`);
  process.exit(1);
}
if (sourceIsBehind) {
  console.warn(`原始碼版本 ${previousVersion} 落後於已發布版本 ${publishedVersion}，本次只驗證打包。`);
}
packageJson.version = nextVersion(sourceIsBehind ? publishedVersion : previousVersion, level);
writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

console.log(`版本改為 ${packageJson.version}，開始打包。`);

let succeeded = false;
try {
  if (runNpm(['run', 'build']).status === 0) {
    const args = ['publish', './dist/ui', '--userconfig', '.npmrc'];
    if (dryRun) args.push('--dry-run');
    succeeded = runNpm(args).status === 0;
  }
} finally {
  if (!succeeded || dryRun) writeFileSync(packagePath, originalManifest);
}

if (!succeeded) process.exit(1);
console.log(`${dryRun ? '已完成發布預演' : '已發布'} ${packageJson.name}@${packageJson.version}`);

function versionParts(version) {
  if (typeof version !== 'string' || !/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`版本格式必須是 x.y.z，目前是 ${version}`);
  }
  return version.split('.').map(Number);
}

function compareVersions(a, b) {
  const [ma, mi, pa] = versionParts(a);
  const [mb, mj, pb] = versionParts(b);
  return ma - mb || mi - mj || pa - pb;
}

function nextVersion(version, release) {
  const [major, minor, patch] = versionParts(version);
  if (release === 'major') {
    return `${major + 1}.0.0`;
  }
  if (release === 'minor') {
    return `${major}.${minor + 1}.0`;
  }
  return `${major}.${minor}.${patch + 1}`;
}

function runNpm(args, capture = false) {
  const npmCli = process.env.npm_execpath;
  const stdio = capture ? ['ignore', 'pipe', 'inherit'] : 'inherit';
  const result = npmCli
    ? spawnSync(process.execPath, [npmCli, ...args], { cwd: root, stdio, encoding: 'utf8' })
    : spawnSync('npm', args, { cwd: root, stdio, encoding: 'utf8', shell: true });

  if (result.error) {
    console.error(result.error.message);
  }
  return result;
}
