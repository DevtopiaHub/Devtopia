// Tool: Fetch JSON from URL
const input = JSON.parse(process.argv[2] || '{}');

async function main() {
  if (!input.url) {
    console.log(JSON.stringify({ error: 'Missing url parameter' }));
    process.exit(1);
  }
  
  try {
    const res = await fetch(input.url);
    const data = await res.json();
    console.log(JSON.stringify({ success: true, data }));
  } catch (err) {
    console.log(JSON.stringify({ success: false, error: err.message }));
  }
}

main();