const input = JSON.parse(process.argv[2] || '{}');

function normalizeAddress(addr) {
  if (!addr) return null;
  if (typeof addr !== 'string') return null;
  let hex = addr.toLowerCase();
  if (hex.startsWith('0x')) hex = hex.slice(2);
  if (hex.length !== 40) return null;
  if (!/^[0-9a-f]+$/.test(hex)) return null;
  return '0x' + hex;
}

function toHex(value) {
  if (value === null || value === undefined) return '0x0';
  if (typeof value === 'string') {
    if (value.startsWith('0x')) return value;
    if (/^[0-9]+$/.test(value)) return '0x' + BigInt(value).toString(16);
  }
  if (typeof value === 'number') {
    return '0x' + BigInt(Math.trunc(value)).toString(16);
  }
  return null;
}

const to = normalizeAddress(input.to);
if (!to) {
  console.log(JSON.stringify({ ok: false, error: 'Missing or invalid to address' }));
  process.exit(1);
}

const from = input.from ? normalizeAddress(input.from) : null;
const data = typeof input.data === 'string' ? input.data : '0x';
const value = toHex(input.value);
const gas = toHex(input.gas);
const gasPrice = toHex(input.gas_price || input.gasPrice);
const nonce = toHex(input.nonce);
const chainId = typeof input.chain_id === 'number' || typeof input.chain_id === 'string'
  ? input.chain_id
  : 8453;

if (value === null || gas === null || gasPrice === null || nonce === null) {
  console.log(JSON.stringify({ ok: false, error: 'Invalid numeric fields (value/gas/gas_price/nonce)' }));
  process.exit(1);
}

const tx = {
  chainId,
  from: from || undefined,
  to,
  data,
  value,
  gas,
  gasPrice,
  nonce,
};

console.log(JSON.stringify({ ok: true, tx }));
