#!/usr/bin/env node
/**
 * password-gen - Generate secure random passwords
 * 
 * Input JSON:
 *   length: number (default 16)
 *   uppercase: boolean (default true)
 *   lowercase: boolean (default true)
 *   numbers: boolean (default true)
 *   symbols: boolean (default true)
 *   excludeAmbiguous: boolean (default false) - exclude 0O1lI
 *   count: number (default 1) - generate multiple passwords
 *   customSymbols: string (optional) - custom symbol set
 * 
 * Output JSON:
 *   passwords: string[]
 *   strength: string (weak/medium/strong/very-strong)
 *   entropy: number (bits)
 */

const crypto = require('crypto');

function generatePassword(options) {
  const {
    length = 16,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
    excludeAmbiguous = false,
    customSymbols = null
  } = options;

  let chars = '';
  
  const ambiguousChars = '0O1lI';
  
  if (uppercase) {
    let set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (excludeAmbiguous) set = set.replace(/[OI]/g, '');
    chars += set;
  }
  
  if (lowercase) {
    let set = 'abcdefghijklmnopqrstuvwxyz';
    if (excludeAmbiguous) set = set.replace(/[l]/g, '');
    chars += set;
  }
  
  if (numbers) {
    let set = '0123456789';
    if (excludeAmbiguous) set = set.replace(/[01]/g, '');
    chars += set;
  }
  
  if (symbols) {
    chars += customSymbols || '!@#$%^&*()_+-=[]{}|;:,.<>?';
  }

  if (chars.length === 0) {
    throw new Error('At least one character set must be enabled');
  }

  // Use crypto for secure randomness
  let password = '';
  const randomBytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    password += chars[randomBytes[i] % chars.length];
  }

  return { password, charsetSize: chars.length };
}

function calculateStrength(length, charsetSize) {
  const entropy = Math.log2(Math.pow(charsetSize, length));
  
  let strength;
  if (entropy < 28) strength = 'weak';
  else if (entropy < 36) strength = 'medium';
  else if (entropy < 60) strength = 'strong';
  else strength = 'very-strong';
  
  return { strength, entropy: Math.round(entropy * 100) / 100 };
}

try {
  const input = JSON.parse(process.argv[2] || '{}');
  
  const count = Math.min(Math.max(input.count || 1, 1), 100);
  const length = Math.min(Math.max(input.length || 16, 4), 128);
  
  const options = { ...input, length };
  
  const passwords = [];
  let charsetSize = 0;
  
  for (let i = 0; i < count; i++) {
    const result = generatePassword(options);
    passwords.push(result.password);
    charsetSize = result.charsetSize;
  }
  
  const { strength, entropy } = calculateStrength(length, charsetSize);
  
  console.log(JSON.stringify({
    passwords,
    strength,
    entropy,
    length,
    charsetSize
  }));
  
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
