#!/usr/bin/env node
/**
 * enhanced-debug - Advanced debugging tool with context and formatting
 * 
 * Enhanced debugging tool that provides structured logging with timestamps,
 * context tracking, and formatted output. Perfect for complex debugging scenarios.
 * 
 * Usage: node enhanced-debug.js '{"message": "Debug info", "context": {...}, "level": "info"}'
 * 
 * Options:
 * - message: Debug message (required)
 * - context: Additional context object
 * - level: Log level (debug, info, warn, error)
 * - timestamp: Include timestamp (default: true)
 * - format: Output format (json, text, compact)
 * 
 * Builds on: debug-log
 */

const input = JSON.parse(process.argv[2] || '{}');

function formatTimestamp() {
  return new Date().toISOString();
}

function formatContext(context) {
  if (!context || typeof context !== 'object') return '';
  
  const entries = Object.entries(context)
    .map(([key, value]) => {
      const valStr = typeof value === 'object' 
        ? JSON.stringify(value) 
        : String(value);
      return `${key}=${valStr}`;
    })
    .join(' ');
  
  return entries ? ` [${entries}]` : '';
}

function formatMessage(level, message, context, format = 'json') {
  const timestamp = input.timestamp !== false ? formatTimestamp() : null;
  
  if (format === 'text') {
    const parts = [];
    if (timestamp) parts.push(`[${timestamp}]`);
    parts.push(`[${level.toUpperCase()}]`);
    parts.push(message);
    if (context) parts.push(formatContext(context));
    return parts.join(' ');
  }
  
  if (format === 'compact') {
    return `${level.toUpperCase()}: ${message}${formatContext(context)}`;
  }
  
  // JSON format (default)
  return {
    timestamp: timestamp || undefined,
    level: level.toUpperCase(),
    message,
    context: context || undefined
  };
}

async function main() {
  if (!input.message) {
    console.log(JSON.stringify({ error: 'Missing required field: message' }));
    process.exit(1);
  }
  
  const level = (input.level || 'info').toLowerCase();
  const validLevels = ['debug', 'info', 'warn', 'error'];
  
  if (!validLevels.includes(level)) {
    console.log(JSON.stringify({ 
      error: `Invalid level. Must be one of: ${validLevels.join(', ')}` 
    }));
    process.exit(1);
  }
  
  const format = input.format || 'json';
  const output = formatMessage(level, input.message, input.context, format);
  
  if (format === 'json') {
    console.log(JSON.stringify({
      success: true,
      ...output
    }));
  } else {
    console.log(output);
  }
  
  // Exit with error code for error level
  if (level === 'error') {
    process.exit(1);
  }
}

main();
