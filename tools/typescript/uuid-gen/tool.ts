#!/usr/bin/env npx ts-node
/**
 * uuid-gen - Generate UUIDs in various formats
 * 
 * Input: {"version": 4} or {"count": 5} or {"format": "short"}
 * Output: {"uuid": "550e8400-e29b-41d4-a716-446655440000"}
 */

import * as crypto from 'crypto';

interface Input {
  version?: number;
  count?: number;
  format?: 'standard' | 'short' | 'base64' | 'hex';
}

function generateUUIDv4(): string {
  const bytes = crypto.randomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant
  
  const hex = bytes.toString('hex');
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32)
  ].join('-');
}

function formatUUID(uuid: string, format: string): string {
  switch (format) {
    case 'short':
      return uuid.replace(/-/g, '').slice(0, 8);
    case 'base64':
      return Buffer.from(uuid.replace(/-/g, ''), 'hex').toString('base64');
    case 'hex':
      return uuid.replace(/-/g, '');
    default:
      return uuid;
  }
}

function main() {
  const input: Input = JSON.parse(process.argv[2] || '{}');
  
  const count = input.count || 1;
  const format = input.format || 'standard';
  
  if (count < 1 || count > 100) {
    console.log(JSON.stringify({ error: 'Count must be between 1 and 100' }));
    process.exit(1);
  }
  
  const uuids = Array.from({ length: count }, () => {
    const uuid = generateUUIDv4();
    return formatUUID(uuid, format);
  });
  
  if (count === 1) {
    console.log(JSON.stringify({
      uuid: uuids[0],
      version: 4,
      format
    }));
  } else {
    console.log(JSON.stringify({
      uuids,
      count,
      version: 4,
      format
    }));
  }
}

main();
