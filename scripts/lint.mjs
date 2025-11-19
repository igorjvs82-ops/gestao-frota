import { readdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { spawn } from 'node:child_process';

const extensions = new Set(['.js', '.mjs']);

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        return collectFiles(fullPath);
      }
      if (extensions.has(extname(entry.name))) {
        return fullPath;
      }
      return [];
    })
  );
  return files.flat();
}

async function check(file) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['--check', file], { stdio: 'inherit' });
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Erro de sintaxe em ${file}`));
    });
  });
}

async function main() {
  const files = await collectFiles('src');
  await Promise.all(files.map(check));
  console.log(`Lint executado em ${files.length} arquivos.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
