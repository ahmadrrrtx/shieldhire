import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8080;
const PROOF_TARGET = 'https://lace-proof-pub.preprod.midnight.network';

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  // 1. Proxy /proof/* requests to the Midnight Network proof server (bypasses CORS)
  if (req.url.startsWith('/proof')) {
    const targetUrl = PROOF_TARGET + req.url.replace(/^\/proof/, '');
    const targetHeaders = { ...req.headers };
    delete targetHeaders.host; // Prevent host mismatches on the proxy destination

    const proxyReq = http.request(targetUrl, {
      method: req.method,
      headers: targetHeaders,
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      console.error('[Proxy Error]:', err);
      res.writeHead(502);
      res.end('Bad Gateway');
    });

    req.pipe(proxyReq);
    return;
  }

  // 2. Serve Static Files from the dist/ folder
  let filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url);
  
  // Strip query parameters and hashes from path
  filePath = filePath.split('?')[0].split('#')[0];

  const ext = path.extname(filePath);
  let contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // If extensionless URL is hit (e.g., /candidate), try appending .html
        const htmlPath = filePath + '.html';
        fs.readFile(htmlPath, (htmlErr, htmlContent) => {
          if (!htmlErr) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(htmlContent);
          } else {
            // Serve 404 response
            res.writeHead(404);
            res.end('Not Found');
          }
        });
      } else {
        res.writeHead(500);
        res.end('Internal Server Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[ShieldHire Server] Running at http://0.0.0.0:${PORT}`);
  console.log(`[Proxy] Routing /proof/* requests to ${PROOF_TARGET}`);
});
