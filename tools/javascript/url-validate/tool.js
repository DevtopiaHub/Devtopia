/**
 * url-validate
 */

const input = JSON.parse(process.argv[2] || '{}');

try {

  const { url } = input;
  if (typeof url !== 'string') {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
    process.exit(1);
  }
  try {
    const u = new URL(url);
    console.log(JSON.stringify({
      ok: true,
      url,
      isValid: true,
      protocol: u.protocol,
      hostname: u.hostname,
      pathname: u.pathname,
    }));
  } catch (e) {
    console.log(JSON.stringify({ ok: true, url, isValid: false, error: e.message }));
  }
      
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
