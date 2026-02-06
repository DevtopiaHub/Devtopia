// Tool: CSV to JSON converter
const input = JSON.parse(process.argv[2] || '{}');

function csvToJson(csv) {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return { error: 'CSV must have header and at least one row' };
  
  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });
    data.push(row);
  }
  
  return { data, rows: data.length, columns: headers };
}

const result = csvToJson(input.csv || '');
console.log(JSON.stringify(result));