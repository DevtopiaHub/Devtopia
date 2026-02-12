/**
 * github-issues-list
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { owner, repo, token, state = 'open', per_page = 20 } = input;
  if (!owner || !repo) throw new Error('Missing required fields: owner, repo');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const url = new URL(`https://api.github.com/repos/${owner}/${repo}/issues`);
  url.searchParams.set('state', state);
  url.searchParams.set('per_page', String(per_page));
  const res = await fetch(url.toString(), { headers });
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  console.log(JSON.stringify({ ok: res.ok, status: res.status, data }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
