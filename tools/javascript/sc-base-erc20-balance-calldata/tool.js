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

const address = normalizeAddress(input.address);
const token = normalizeAddress(input.token);

if (!address) {
  console.log(JSON.stringify({ ok: false, error: 'Missing or invalid address' }));
  process.exit(1);
}
if (!token) {
  console.log(JSON.stringify({ ok: false, error: 'Missing or invalid token address' }));
  process.exit(1);
}

const selector = '0x70a08231'; // balanceOf(address)
const data = selector + pad64(address);

console.log(JSON.stringify({
  ok: true,
  method: 'balanceOf',
  selector,
  call: {
    to: token,
    data,
  },
}));
