// echo-url-sort-query - Sort query params alphabetically.
function main(params) {
  const urlStr = typeof params?.url === 'string' ? params.url : '';
  if (!urlStr) return { error: 'url required' };
  const url = new URL(urlStr);
  const entries = Array.from(url.searchParams.entries()).sort(([a], [b]) => a.localeCompare(b));
  url.search = '';
  for (const [key, value] of entries) {
    url.searchParams.append(key, value);
  }
  return { url: url.toString() };
}
