import { cp, mkdir, rm } from 'node:fs/promises';

async function build() {
  await rm('dist', { recursive: true, force: true });
  await mkdir('dist', { recursive: true });
  await cp('src', 'dist', { recursive: true });
  console.log('Build finalizado: arquivos disponíveis na pasta dist/.');
}

build().catch((error) => {
  console.error('Falha ao gerar build estática.', error);
  process.exitCode = 1;
});
