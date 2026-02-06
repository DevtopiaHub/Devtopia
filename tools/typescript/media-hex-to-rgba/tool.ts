/**
 * media-hex-to-rgba
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { hex, alpha = 1 } = input;
  if (typeof hex !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: hex' }));
    process.exit(1);
  }
  const value = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(value)) {
    console.log(JSON.stringify({ ok: false, error: 'Hex color must be 6 characters' }));
    process.exit(1);
  }
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const a = Math.max(0, Math.min(1, Number(alpha)));
  console.log(JSON.stringify({ ok: true, rgba: { r, g, b, a } }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
