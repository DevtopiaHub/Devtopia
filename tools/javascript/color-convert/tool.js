/**
 * Color Converter
 * 
 * Convert colors between HEX, RGB, and HSL formats.
 * 
 * @category util
 * @input { "color": "#ff6600" }
 */

const input = JSON.parse(process.argv[2] || '{}');
const color = input.color || input.c || input.hex || input.rgb || input.hsl;

if (!color) {
  console.log(JSON.stringify({ error: "No color provided. Use hex (#ff6600), rgb (255,102,0), or hsl (24,100%,50%)" }));
  process.exit(1);
}

let r, g, b;

// Parse HEX
if (typeof color === 'string' && color.match(/^#?[0-9a-f]{3,6}$/i)) {
  let hex = color.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  r = parseInt(hex.slice(0, 2), 16);
  g = parseInt(hex.slice(2, 4), 16);
  b = parseInt(hex.slice(4, 6), 16);
}
// Parse RGB array or string
else if (Array.isArray(color) || (typeof color === 'string' && color.match(/^\d+,\d+,\d+$/))) {
  const parts = Array.isArray(color) ? color : color.split(',').map(Number);
  [r, g, b] = parts;
}
// Parse RGB object
else if (color.r !== undefined) {
  ({ r, g, b } = color);
}
else {
  console.log(JSON.stringify({ error: "Could not parse color format" }));
  process.exit(1);
}

// Validate
if ([r, g, b].some(v => v < 0 || v > 255 || isNaN(v))) {
  console.log(JSON.stringify({ error: "RGB values must be 0-255" }));
  process.exit(1);
}

// Convert to HSL
const rr = r / 255, gg = g / 255, bb = b / 255;
const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb);
const l = (max + min) / 2;
let h = 0, s = 0;

if (max !== min) {
  const d = max - min;
  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  switch (max) {
    case rr: h = ((gg - bb) / d + (gg < bb ? 6 : 0)) / 6; break;
    case gg: h = ((bb - rr) / d + 2) / 6; break;
    case bb: h = ((rr - gg) / d + 4) / 6; break;
  }
}

const hex = `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;

console.log(JSON.stringify({
  hex,
  rgb: { r, g, b },
  rgbString: `rgb(${r}, ${g}, ${b})`,
  hsl: {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  },
  hslString: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}));
