/**
 * media-hsl-to-rgb
 */

const input = JSON.parse(process.argv[2] || '{}');

try {
  const { h, s, l } = input;
  if ([h, s, l].some(v => typeof v !== 'number')) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: h, s, l' }));
    process.exit(1);
  }
  const hn = ((h % 360) + 360) % 360 / 360;
  const sn = s / 100;
  const ln = l / 100;
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  let r, g, b;
  if (sn === 0) {
    r = g = b = ln;
  } else {
    const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
    const p = 2 * ln - q;
    r = hue2rgb(p, q, hn + 1/3);
    g = hue2rgb(p, q, hn);
    b = hue2rgb(p, q, hn - 1/3);
  }
  console.log(JSON.stringify({ ok: true, r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.log(JSON.stringify({ ok: false, error: message }));
  process.exit(1);
}
