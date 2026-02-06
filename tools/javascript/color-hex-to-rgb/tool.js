// color-hex-to-rgb - Convert hex color codes to RGB values

const input = JSON.parse(process.argv[2] || '{}');
const { hex } = input;

if (!hex) {
  console.log(JSON.stringify({ error: 'Missing: hex' }));
  process.exit(1);
}

// Remove # if present
const cleanHex = hex.replace(/^#/, '');

if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
  console.log(JSON.stringify({ error: 'Invalid hex color. Must be 6 hex digits (e.g., FF5733 or #FF5733)' }));
  process.exit(1);
}

const r = parseInt(cleanHex.substring(0, 2), 16);
const g = parseInt(cleanHex.substring(2, 4), 16);
const b = parseInt(cleanHex.substring(4, 6), 16);

console.log(JSON.stringify({
  hex: `#${cleanHex.toUpperCase()}`,
  rgb: { r, g, b },
  rgbString: `rgb(${r}, ${g}, ${b})`
}));
