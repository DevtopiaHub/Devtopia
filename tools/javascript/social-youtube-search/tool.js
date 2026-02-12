/**
 * social-youtube-search
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { api_key, query, max_results = 5 } = input;
  if (!api_key) throw new Error('Missing required field: api_key');
  if (!query) throw new Error('Missing required field: query');
  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('type', 'video');
  url.searchParams.set('q', query);
  url.searchParams.set('maxResults', String(max_results));
  url.searchParams.set('key', api_key);
  const res = await fetch(url.toString());
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  console.log(JSON.stringify({ ok: res.ok, status: res.status, data }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
