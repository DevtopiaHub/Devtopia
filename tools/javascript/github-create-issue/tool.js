/**
 * github-create-issue
 */

const input = JSON.parse(process.argv[2] || '{}');

(async () => {
  try {

  const { owner, repo, token, title, body } = input;
  if (!owner || !repo || !token) throw new Error('Missing required fields: owner, repo, token');
  if (!title) throw new Error('Missing required field: title');
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  });
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  console.log(JSON.stringify({ ok: res.ok, status: res.status, data }));
      
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(JSON.stringify({ ok: false, error: message }));
    process.exit(1);
  }
})();
