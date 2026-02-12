// url-normalize - Normalize URL casing and strip hash.
function main(params) {
  const urlStr = typeof params?.url === 'string' ? params.url : '';
  if (!urlStr) return { error: 'url required' };
  const url = new URL(urlStr);
  url.hash = '';
  url.protocol = url.protocol.toLowerCase();
  url.hostname = url.hostname.toLowerCase();
  return { url: url.toString() };
}
