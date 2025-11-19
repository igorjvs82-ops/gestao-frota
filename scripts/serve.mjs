import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript'
};

const server = createServer(async (req, res) => {
  const urlPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = join('dist', urlPath);
  try {
    const file = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] ?? 'text/plain' });
    res.end(file);
  } catch (error) {
    res.writeHead(404).end('Arquivo não encontrado. Execute npm run build antes do start.');
  }
});

const port = process.env.PORT || 4173;
server.listen(port, () => console.log(`Servidor estático em http://localhost:${port}`));
