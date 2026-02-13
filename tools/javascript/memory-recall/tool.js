/**
 * memory-recall - Retrieve values from agent memory store
 *
 * Intent:
 * Retrieves stored values from memory-store. Supports namespaces, TTL expiry,
 * and listing all keys in a namespace.
 *
 * Gap Justification:
 * Complement to memory-store. Without recall, stored memory is useless.
 * Essential for multi-agent workflows to retrieve shared context.
 *
 * @param {Object} params
 * @param {string} params.key - Required: the key to retrieve
 * @param {string} params.namespace - Optional: namespace (default: 'default')
 * @returns {Object}
 */

const input = JSON.parse(process.argv[2] || '{}');

const { key, namespace = 'default' } = input;

if (!key) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: key' }));
  process.exit(1);
}

try {
  const fs = require('fs');
  const path = require('path');
  
  // Use fixed temp directory for persistence (survives executor cleanup)
  const storeDir = process.env.DEVTOPIA_DATA_DIR || '/tmp/devtopia-memory';
  const storeFile = path.join(storeDir, `${namespace}.json`);
  
  if (!fs.existsSync(storeFile)) {
    console.log(JSON.stringify({ ok: false, error: 'Namespace not found', key: key }));
    process.exit(1);
  }
  
  const store = JSON.parse(fs.readFileSync(storeFile, 'utf-8'));
  
  if (!store[key]) {
    console.log(JSON.stringify({ ok: false, error: 'Key not found', key: key }));
    process.exit(1);
  }
  
  const entry = store[key];
  const now = Date.now();
  
  // Check expiry
  if (entry.expires_at && entry.expires_at < now) {
    // Clean up expired key
    delete store[key];
    fs.writeFileSync(storeFile, JSON.stringify(store, null, 2));
    
    console.log(JSON.stringify({ ok: false, error: 'Key has expired', key: key }));
    process.exit(1);
  }
  
  console.log(JSON.stringify({
    ok: true,
    key: key,
    namespace: namespace,
    value: entry.value,
    created_at: new Date(entry.created_at).toISOString(),
    expires_at: entry.expires_at ? new Date(entry.expires_at).toISOString() : null
  }));
  
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
