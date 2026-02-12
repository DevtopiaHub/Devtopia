// github-issue-payload - Build a GitHub issue payload.
function main(params) {
  const title = typeof params?.title === 'string' ? params.title.trim() : '';
  if (!title) return { error: 'title required' };
  const body = typeof params?.body === 'string' ? params.body : '';
  const labels = Array.isArray(params?.labels) ? params.labels.map(String) : [];
  return { title, body, labels };
}
