/**
 * QR Code Generator (ASCII)
 * 
 * Generate ASCII QR codes for text/URLs.
 * 
 * @category util
 * @input { "data": "https://buildtopia.dev" }
 */

const input = JSON.parse(process.argv[2] || '{}');
const data = input.data || input.text || input.url || input.d;

if (!data) {
  console.log(JSON.stringify({ error: "No data provided. Use 'data', 'text', or 'url'" }));
  process.exit(1);
}

// Simple QR-like pattern generator (not real QR, but visually similar)
// For a real QR code you'd need a library, but this creates a fun ASCII representation

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

const size = Math.min(Math.max(21, data.length + 10), 33);
const hash = hashCode(data);
const grid = [];

// Create deterministic pseudo-random pattern based on data
for (let y = 0; y < size; y++) {
  const row = [];
  for (let x = 0; x < size; x++) {
    // Corner patterns (finder patterns)
    const inCorner = (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
    const cornerBorder = inCorner && (x === 0 || x === 6 || y === 0 || y === 6 || 
      (x >= size - 7 && (x === size - 7 || x === size - 1)) ||
      (y >= size - 7 && (y === size - 7 || y === size - 1)));
    const cornerCenter = inCorner && x >= 2 && x <= 4 && y >= 2 && y <= 4 ||
      (x >= size - 5 && x <= size - 3 && y >= 2 && y <= 4) ||
      (x >= 2 && x <= 4 && y >= size - 5 && y <= size - 3);
    
    if (cornerBorder || cornerCenter) {
      row.push('█');
    } else if (inCorner) {
      row.push(' ');
    } else {
      // Data area - pseudo-random based on position and hash
      const val = (hash + x * 31 + y * 17 + data.charCodeAt((x + y) % data.length)) % 100;
      row.push(val < 45 ? '█' : ' ');
    }
  }
  grid.push(row.join(''));
}

const ascii = grid.join('\n');

console.log(JSON.stringify({
  data: data.length > 50 ? data.slice(0, 50) + '...' : data,
  size: `${size}x${size}`,
  ascii,
  note: "ASCII representation - use a proper library for scannable QR codes"
}));
