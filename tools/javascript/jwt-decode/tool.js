/**
 * JWT Decoder
 * 
 * Decode JWT tokens without verification (inspect only).
 * 
 * @category crypto
 * @input { "token": "eyJhbGciOiJIUzI1NiIs..." }
 */

const input = JSON.parse(process.argv[2] || '{}');
const token = input.token || input.jwt || input.t;

if (!token) {
  console.log(JSON.stringify({ error: "No token provided" }));
  process.exit(1);
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf8');
}

const parts = token.split('.');
if (parts.length !== 3) {
  console.log(JSON.stringify({ error: "Invalid JWT format (expected 3 parts)" }));
  process.exit(1);
}

try {
  const header = JSON.parse(base64UrlDecode(parts[0]));
  const payload = JSON.parse(base64UrlDecode(parts[1]));
  
  // Check expiration
  let expired = null;
  let expiresIn = null;
  if (payload.exp) {
    const now = Math.floor(Date.now() / 1000);
    expired = payload.exp < now;
    expiresIn = expired ? `expired ${now - payload.exp}s ago` : `expires in ${payload.exp - now}s`;
  }
  
  // Format dates
  const dates = {};
  if (payload.iat) dates.issuedAt = new Date(payload.iat * 1000).toISOString();
  if (payload.exp) dates.expiresAt = new Date(payload.exp * 1000).toISOString();
  if (payload.nbf) dates.notBefore = new Date(payload.nbf * 1000).toISOString();
  
  console.log(JSON.stringify({
    header,
    payload,
    dates: Object.keys(dates).length ? dates : undefined,
    expired,
    expiresIn,
    signature: parts[2].slice(0, 20) + '...',
    warning: "⚠️ Signature not verified - decode only"
  }));
} catch (e) {
  console.log(JSON.stringify({ error: "Failed to decode JWT: " + e.message }));
  process.exit(1);
}
