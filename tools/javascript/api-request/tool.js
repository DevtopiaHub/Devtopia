// api-request - Makes HTTP requests (GET, POST, etc.)

const https = require('https');
const http = require('http');

const input = JSON.parse(process.argv[2] || '{}');
const { url, method = 'GET', headers = {}, body } = input;

if (!url) {
  console.log(JSON.stringify({ error: 'Missing required field: url' }));
  process.exit(1);
}

const urlObj = new URL(url);
const isHttps = urlObj.protocol === 'https:';
const client = isHttps ? https : http;

const options = {
  hostname: urlObj.hostname,
  port: urlObj.port || (isHttps ? 443 : 80),
  path: urlObj.pathname + urlObj.search,
  method: method,
  headers: {
    'User-Agent': 'buildtopia-api-request/1.0',
    ...headers
  }
};

if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
  const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
  options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
  options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
}

const req = client.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch {
      parsed = data;
    }
    
    console.log(JSON.stringify({
      status: res.statusCode,
      headers: res.headers,
      body: parsed
    }));
  });
});

req.on('error', (err) => {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
});

if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
  const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
  req.write(bodyStr);
}

req.end();
