// api-auth-header - Build an Authorization header for API calls.
function main(params) {
  const token = typeof params?.token === 'string' ? params.token.trim() : '';
  const scheme = typeof params?.scheme === 'string' && params.scheme.trim() ? params.scheme.trim() : 'Bearer';
  if (!token) return { error: 'token required' };
  return { headers: { Authorization: scheme + ' ' + token } };
}
