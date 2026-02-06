/**
 * media-rgb-to-hsl
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { r, g, b } = input;
  if ([r, g, b].some(v => typeof v !== 'number')) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: r, g, b' }));
    process.exit(1);
  }
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      case bn: h = (rn - gn) / d + 4; break;
    }
    h /= 6;
  }
  console.log(JSON.stringify({ ok: true, h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
