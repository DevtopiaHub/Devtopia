// echo-url-normalize-sort - Normalize then sort query params using composed tools.
const { devtopiaRun } = require('./devtopia-runtime');

function main(params) {
  const urlStr = typeof params?.url === 'string' ? params.url : '';
  if (!urlStr) return { error: 'url required' };
  const normalized = devtopiaRun('echo-url-normalize', { url: urlStr });
  const sorted = devtopiaRun('echo-url-sort-query', { url: normalized.url || '' });
  return { url: sorted.url || '' };
}
