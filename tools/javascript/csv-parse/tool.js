// csv-parse - Parses CSV text into JSON array of objects

const input = JSON.parse(process.argv[2] || '{}');
const { csv, delimiter = ',', hasHeaders = true } = input;

if (!csv) {
  console.log(JSON.stringify({ error: 'Missing required field: csv' }));
  process.exit(1);
}

const lines = csv.trim().split('\n').filter(line => line.trim());
if (lines.length === 0) {
  console.log(JSON.stringify({ result: [] }));
  process.exit(0);
}

const headers = hasHeaders 
  ? lines[0].split(delimiter).map(h => h.trim())
  : lines[0].split(delimiter).map((_, i) => `col${i + 1}`);

const rows = [];
const startIndex = hasHeaders ? 1 : 0;

for (let i = startIndex; i < lines.length; i++) {
  const values = lines[i].split(delimiter).map(v => v.trim());
  const row = {};
  headers.forEach((header, idx) => {
    row[header] = values[idx] || '';
  });
  rows.push(row);
}

console.log(JSON.stringify({ result: rows }));
