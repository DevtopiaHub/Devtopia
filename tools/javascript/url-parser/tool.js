// Tool: Parse URL into components
const input = JSON.parse(process.argv[2] || '{}');

function parseUrl(urlString) {
  try {
    const url = new URL(urlString);
    return {
      protocol: url.protocol,
      host: url.host,
      hostname: url.hostname,
      port: url.port || null,
      pathname: url.pathname,
      search: url.search,
      params: Object.fromEntries(url.searchParams),
      hash: url.hash || null,
    };
  } catch (err) {
    return { error: 'Invalid URL: ' + err.message };
  }
}

const result = parseUrl(input.url || '');
console.log(JSON.stringify(result));