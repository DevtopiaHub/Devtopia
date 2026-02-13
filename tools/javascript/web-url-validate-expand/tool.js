/**
 * web-url-validate-expand
 * 
 * Validate URLs and expand shortened URLs (bit.ly, t.co, etc.)
 * Useful for checking link safety and getting final destinations.
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

function getDomain(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function isShortener(url) {
  const shorteners = [
    'bit.ly', 't.co', 'tinyurl.com', 'short.link', 'goo.gl',
    'ow.ly', 'buff.ly', 'dlvr.it', 'is.gd', 'tr.im',
    'rb.gy', 'short.io', 'rebrand.ly'
  ];
  const domain = getDomain(url);
  return domain && shorteners.some(s => domain.includes(s));
}

try {
  const { url, expand = true } = input;
  
  if (!url) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: url' }));
    process.exit(1);
  }
  
  if (!isValidUrl(url)) {
    console.log(JSON.stringify({ 
      ok: false, 
      error: 'Invalid URL',
      details: 'URL must start with http:// or https://'
    }));
    process.exit(1);
  }
  
  const result = {
    ok: true,
    original_url: url,
    is_valid: true,
    domain: getDomain(url),
    is_shortened: isShortener(url),
    protocol: new URL(url).protocol.replace(':', '')
  };
  
  if (expand && result.is_shortened) {
    // Try to expand by following redirects
    const fetchResult = devtopiaRun('web-fetch-headers', { url, follow_redirects: true });
    
    if (fetchResult && fetchResult.ok && fetchResult.final_url) {
      result.expanded_url = fetchResult.final_url;
      result.expanded_domain = getDomain(fetchResult.final_url);
      result.expansion_success = true;
    } else {
      result.expansion_success = false;
      result.expansion_error = fetchResult?.error || 'Could not expand URL';
    }
  }
  
  // Security analysis
  const suspicious = [
    'phishing', 'malware', 'suspicious', 'verify-account',
    'login-secure', 'update-info', 'confirm-identity'
  ];
  
  const urlLower = url.toLowerCase();
  result.security_flags = suspicious.filter(s => urlLower.includes(s));
  result.security_risk = result.security_flags.length > 0 ? 'suspicious' : 'low';
  
  console.log(JSON.stringify(result));
  
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}