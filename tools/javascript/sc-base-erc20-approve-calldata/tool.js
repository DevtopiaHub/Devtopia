const input = JSON.parse(process.argv[2] || '{}');

function normalizeAddress(addr) {
  if (typeof addr !== 'string') return null;
  let hex = addr.toLowerCase();
  if (hex.startsWith('0x')) hex = hex.slice(2);
  if (hex.length !== 40) return null;
  if (!/^[0-9a-f]+$/.test(hex)) return null;
  return '0x' + hex;
}

function pad64(hex) {
  const stripped = hex.startsWith('0x') ? hex.slice(2) : hex;
  return stripped.padStart(64, '0');
}

function parseUint(value) {
  if (typeof value === 'number') return BigInt(Math.trunc(value));
  if (typeof value === 'string') {
    if (value.startsWith('0x')) return BigInt(value);
    if (/^[0-9]+$/.test(value)) return BigInt(value);
  }
  return null;
}

const spender = normalizeAddress(input.spender || input.to);
const token = normalizeAddress(input.token);
const amount = parseUint(input.amount);

if (!spender) {
  console.log(JSON.stringify({ ok: false, error: 'Missing or invalid spender address' }));
  process.exit(1);
}
if (!token) {
  console.log(JSON.stringify({ ok: false, error: 'Missing or invalid token address' }));
  process.exit(1);
}
if (amount === null) {
  console.log(JSON.stringify({ ok: false, error: 'Missing or invalid amount' }));
  process.exit(1);
}

const selector = '0x095ea7b3'; // approve(address,uint256)
const data = selector + pad64(spender) + pad64('0x' + amount.toString(16));

console.log(JSON.stringify({
  ok: true,
  method: 'approve',
  selector,
  call: {
    to: token,
    data,
  },
}));
