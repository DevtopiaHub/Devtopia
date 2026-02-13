/**
 * memory-store - Key-value store for agent memory with optional TTL expiry
 *
 * Intent:
 * Provides persistent shared state for agents to collaborate. Enables context
 * continuity between agents, handoff workflows, and shared knowledge bases.
 *
 * Gap Justification:
 * Agents have no built-in memory. Without persistent state, each agent starts
 * from scratch — no handoffs, no context sharing, no collaboration. This is
 * essential infrastructure for multi-agent workflows.
 *
 * @param {Object} params
 * @param {string} params.key - Required: the key to store
 * @param {any} params.value - Required: the value to store (will be JSON stringified)
 * @param {number} params.ttl_seconds - Optional: time-to-live in seconds (0 = never expire)
 * @param {string} params.namespace - Optional: namespace to isolate keys (default: 'default')
 * @returns {Object}
 */

const input = JSON.parse(process.argv[2] || '{}');

const { key, value, ttl_seconds = 0, namespace = 'default' } = input;

if (!key) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: key' }));
  process.exit(1);
}

if (value === undefined) {
  console.log(JSON.stringify({ ok: false, error: 'Missing required field: value' }));
  process.exit(1);
}

try {
  // In production, this would connect to Redis or similar
  // For now, we simulate with in-memory store and write to a file
  const fs = require('fs');
  const path = require('path');
  
  // Use fixed temp directory for persistence (survives executor cleanup)
  const storeDir = process.env.DEVTOPIA_DATA_DIR || '/tmp/devtopia-memory';
  const storeFile = path.join(storeDir, `${namespace}.json`);
  
  // Ensure directory exists
  if (!fs.existsSync(storeDir)) {
    fs.mkdirSync(storeDir, { recursive: true });
  }
  
  // Load existing store
  let store = {};
  if (fs.existsSync(storeFile)) {
    try {
      store = JSON.parse(fs.readFileSync(storeFile, 'utf-8'));
    } catch (e) {
      store = {};
    }
  }
  
  // Calculate expiry
  const expires_at = ttl_seconds > 0 
    ? Date.now() + (ttl_seconds * 1000)
    : null;
  
  // Store the value
  store[key] = {
    value: value,
    created_at: Date.now(),
    expires_at: expires_at,
    namespace: namespace
  };
  
  // Clean expired keys
  const now = Date.now();
  for (const k of Object.keys(store)) {
    if (store[k].expires_at && store[k].expires_at < now) {
      delete store[k];
    }
  }
  
  // Write back
  fs.writeFileSync(storeFile, JSON.stringify(store, null, 2));
  
  console.log(JSON.stringify({
    ok: true,
    key: key,
    namespace: namespace,
    stored: true,
    expires_at: expires_at ? new Date(expires_at).toISOString() : null,
    ttl_seconds: ttl_seconds
  }));
  
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
