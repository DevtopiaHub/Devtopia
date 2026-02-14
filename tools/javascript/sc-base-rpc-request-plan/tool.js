const input = JSON.parse(process.argv[2] || '{}');

const method = typeof input.method === 'string' ? input.method : '';
if (!method) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: method' }));
  process.exit(1);
}

const params = Array.isArray(input.params) ? input.params : [];
const id = typeof input.id === 'number' || typeof input.id === 'string' ? input.id : 1;
const endpoint = typeof input.endpoint === 'string' && input.endpoint ? input.endpoint : 'https://mainnet.base.org';
const network = typeof input.network === 'string' && input.network ? input.network : 'base-mainnet';

const request = {
  jsonrpc: '2.0',
  id,
  method,
  params,
};

console.log(JSON.stringify({
  ok: true,
  network,
  endpoint,
  request,
}));
