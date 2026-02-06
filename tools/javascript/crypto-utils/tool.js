#!/usr/bin/env node
/**
 * crypto-utils - Cryptographic utilities combining hashing and encoding
 * 
 * Comprehensive cryptographic tool that combines hashing, encoding, and
 * encoding operations. Perfect for security applications and data protection.
 * 
 * Usage: node crypto-utils.js '{"action": "hash", "data": "secret", "algorithm": "sha256"}'
 * 
 * Options:
 * - action: Operation to perform (hash, encode, decode)
 * - data: Input data (required)
 * - algorithm: Hash algorithm (md5, sha256) or encoding (base64, hex)
 * 
 * Builds on: md5-hash, base64, url-encode
 */

const input = JSON.parse(process.argv[2] || '{}');
const crypto = require('crypto');

// Hash data (composing md5-hash)
function hashData(data, algorithm = 'sha256') {
  const algo = algorithm.toLowerCase();
  
  if (algo === 'md5') {
    return crypto.createHash('md5').update(data).digest('hex');
  } else if (algo === 'sha256') {
    return crypto.createHash('sha256').update(data).digest('hex');
  } else if (algo === 'sha1') {
    return crypto.createHash('sha1').update(data).digest('hex');
  } else {
    throw new Error(`Unsupported hash algorithm: ${algorithm}`);
  }
}

// Base64 encode/decode (composing base64)
function base64Encode(data) {
  return Buffer.from(data).toString('base64');
}

function base64Decode(data) {
  return Buffer.from(data, 'base64').toString('utf8');
}

// URL encode/decode (composing url-encode)
function urlEncode(data) {
  return encodeURIComponent(data);
}

function urlDecode(data) {
  return decodeURIComponent(data);
}

async function main() {
  if (!input.data) {
    console.log(JSON.stringify({ error: 'Missing required field: data' }));
    process.exit(1);
  }
  
  const action = (input.action || 'hash').toLowerCase();
  const algorithm = (input.algorithm || 'sha256').toLowerCase();
  
  try {
    let result;
    
    switch (action) {
      case 'hash':
        result = hashData(input.data, algorithm);
        console.log(JSON.stringify({
          success: true,
          action: 'hash',
          algorithm,
          input: input.data,
          hash: result,
          length: result.length
        }));
        break;
        
      case 'encode':
        if (algorithm === 'base64') {
          result = base64Encode(input.data);
          console.log(JSON.stringify({
            success: true,
            action: 'encode',
            algorithm: 'base64',
            input: input.data,
            encoded: result
          }));
        } else if (algorithm === 'url' || algorithm === 'urlencode') {
          result = urlEncode(input.data);
          console.log(JSON.stringify({
            success: true,
            action: 'encode',
            algorithm: 'url',
            input: input.data,
            encoded: result
          }));
        } else {
          throw new Error(`Unsupported encoding: ${algorithm}`);
        }
        break;
        
      case 'decode':
        if (algorithm === 'base64') {
          result = base64Decode(input.data);
          console.log(JSON.stringify({
            success: true,
            action: 'decode',
            algorithm: 'base64',
            input: input.data,
            decoded: result
          }));
        } else if (algorithm === 'url' || algorithm === 'urldecode') {
          result = urlDecode(input.data);
          console.log(JSON.stringify({
            success: true,
            action: 'decode',
            algorithm: 'url',
            input: input.data,
            decoded: result
          }));
        } else {
          throw new Error(`Unsupported decoding: ${algorithm}`);
        }
        break;
        
      default:
        throw new Error(`Invalid action: ${action}. Must be hash, encode, or decode`);
    }
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
