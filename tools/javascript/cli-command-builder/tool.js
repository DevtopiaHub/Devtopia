#!/usr/bin/env node
/**
 * cli-command-builder - Build CLI commands from structured input
 * 
 * Construct CLI commands from structured data, handling argument parsing,
 * flag generation, and command composition. Perfect for programmatic CLI usage.
 * 
 * Usage: node cli-command-builder.js '{"command": "git", "args": ["commit"], "flags": {"m": "message"}}'
 * 
 * Options:
 * - command: Base command (required)
 * - args: Array of positional arguments
 * - flags: Object of flags (short or long form)
 * - options: Object of options (key=value pairs)
 * 
 * Builds on: cli-args
 */

const input = JSON.parse(process.argv[2] || '{}');

// Parse CLI arguments structure (composing cli-args)
function buildCommand(command, args = [], flags = {}, options = {}) {
  const parts = [command];
  
  // Add positional arguments
  for (const arg of args) {
    if (arg !== null && arg !== undefined) {
      parts.push(String(arg));
    }
  }
  
  // Add flags (short: -f, long: --flag)
  for (const [key, value] of Object.entries(flags)) {
    if (value === true || value === 'true') {
      // Boolean flag
      if (key.length === 1) {
        parts.push(`-${key}`);
      } else {
        parts.push(`--${key}`);
      }
    } else if (value !== false && value !== null && value !== undefined) {
      // Flag with value
      if (key.length === 1) {
        parts.push(`-${key}`, String(value));
      } else {
        parts.push(`--${key}=${String(value)}`);
      }
    }
  }
  
  // Add options (key=value format)
  for (const [key, value] of Object.entries(options)) {
    if (value !== null && value !== undefined) {
      parts.push(`${key}=${String(value)}`);
    }
  }
  
  return parts.join(' ');
}

// Parse command string back to structure (composing cli-args)
function parseCommand(cmdString) {
  const parts = cmdString.trim().split(/\s+/);
  const command = parts[0];
  const args = [];
  const flags = {};
  const options = {};
  
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    
    // Long flag: --flag or --flag=value
    if (part.startsWith('--')) {
      const [flag, value] = part.slice(2).split('=');
      flags[flag] = value !== undefined ? value : true;
    }
    // Short flag: -f or -f value
    else if (part.startsWith('-') && part.length === 2) {
      const flag = part[1];
      const nextPart = parts[i + 1];
      if (nextPart && !nextPart.startsWith('-')) {
        flags[flag] = nextPart;
        i++; // Skip next part
      } else {
        flags[flag] = true;
      }
    }
    // Option: key=value
    else if (part.includes('=')) {
      const [key, value] = part.split('=');
      options[key] = value;
    }
    // Positional argument
    else {
      args.push(part);
    }
  }
  
  return { command, args, flags, options };
}

async function main() {
  const action = input.action || 'build';
  
  if (action === 'build') {
    if (!input.command) {
      console.log(JSON.stringify({ error: 'Missing required field: command' }));
      process.exit(1);
    }
    
    const cmd = buildCommand(
      input.command,
      input.args || [],
      input.flags || {},
      input.options || {}
    );
    
    console.log(JSON.stringify({
      success: true,
      command: cmd,
      parts: cmd.split(' ')
    }));
  } else if (action === 'parse') {
    if (!input.commandString) {
      console.log(JSON.stringify({ error: 'Missing required field: commandString' }));
      process.exit(1);
    }
    
    const parsed = parseCommand(input.commandString);
    
    console.log(JSON.stringify({
      success: true,
      ...parsed
    }));
  } else {
    console.log(JSON.stringify({ 
      error: `Invalid action. Must be 'build' or 'parse'` 
    }));
    process.exit(1);
  }
}

main();
