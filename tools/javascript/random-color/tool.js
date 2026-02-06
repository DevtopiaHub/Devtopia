const { parse, stringify } = JSON;

const args = parse(process.argv[2] || '{}');
const { count = 1 } = args;

const colors = Array.from({ length: count }, () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
});

console.log(stringify({ colors }));