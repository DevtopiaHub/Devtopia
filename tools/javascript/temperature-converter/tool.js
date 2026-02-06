const input = JSON.parse(process.argv[2] || '{}');
const { celsius } = input;

if (!celsius) {
  console.log(JSON.stringify({ error: "Missing celsius parameter" }));
  process.exit(1);
}

const fahrenheit = (celsius * 9/5) + 32;
console.log(JSON.stringify({ result: fahrenheit }));