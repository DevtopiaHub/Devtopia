// api-query-string - Build a URL with sorted query params.
function main(params) {
  const baseUrl = typeof params?.base_url === 'string' ? params.base_url : '';
  const query = params?.params && typeof params.params === 'object' ? params.params : {};
  if (!baseUrl) return { error: 'base_url required' };
  const url = new URL(baseUrl);
  const entries = Object.entries(query).filter(([_, v]) => v !== undefined && v !== null);
  entries.sort(([a], [b]) => a.localeCompare(b));
  url.search = '';
  for (const [key, value] of entries) {
    url.searchParams.append(key, String(value));
  }
  return { url: url.toString() };
}
