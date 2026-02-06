#!/usr/bin/env node
/**
 * config-manager - Configuration file manager for AI agents
 * Helps AI agents read, validate, and manage configuration files
 */

const input = JSON.parse(process.argv[2] || '{}');
const fs = require('fs');
const path = require('path');

function manageConfig(action, configPath, options = {}) {
    const result = {
        action: action,
        path: configPath,
        exists: false,
        valid: false,
        data: null,
        validation: {},
        timestamp: new Date().toISOString()
    };
    
    try {
        // Check if file exists
        if (fs.existsSync(configPath)) {
            result.exists = true;
            const stats = fs.statSync(configPath);
            result.size = stats.size;
            result.modified = stats.mtime.toISOString();
        } else {
            result.error = 'Config file does not exist';
            return result;
        }
        
        // Read file content
        const content = fs.readFileSync(configPath, 'utf8');
        
        // Parse based on file extension
        const ext = path.extname(configPath).toLowerCase();
        
        switch (ext) {
            case '.json':
                try {
                    result.data = JSON.parse(content);
                    result.format = 'json';
                    result.valid = true;
                } catch (e) {
                    result.error = `Invalid JSON: ${e.message}`;
                    result.valid = false;
                }
                break;
                
            case '.yaml':
            case '.yml':
                result.data = parseYaml(content);
                result.format = 'yaml';
                result.valid = result.data !== null;
                if (!result.valid) {
                    result.error = 'Invalid YAML format';
                }
                break;
                
            case '.env':
                result.data = parseEnv(content);
                result.format = 'env';
                result.valid = true;
                break;
                
            default:
                // Try to parse as JSON first, then as key-value pairs
                try {
                    result.data = JSON.parse(content);
                    result.format = 'json';
                    result.valid = true;
                } catch (e) {
                    result.data = parseKeyValue(content);
                    result.format = 'keyvalue';
                    result.valid = Object.keys(result.data).length > 0;
                }
        }
        
        // Validate if schema provided
        if (options.schema && result.data) {
            result.validation = validateAgainstSchema(result.data, options.schema);
            result.valid = result.validation.isValid;
        }
        
        // Create default config if requested
        if (action === 'create' && options.defaultConfig) {
            const defaultData = options.defaultConfig;
            const configData = { ...defaultData, ...result.data };
            
            // Write the merged config
            const output = ext === '.json' ? JSON.stringify(configData, null, 2) : 
                           ext === '.yaml' || ext === '.yml' ? yamlStringify(configData) :
                           envStringify(configData);
            
            fs.writeFileSync(configPath, output);
            result.created = true;
            result.data = configData;
        }
        
    } catch (error) {
        result.error = error.message;
        result.valid = false;
    }
    
    return result;
}

// Simple YAML parser (basic implementation)
function parseYaml(content) {
    const lines = content.split('\n').filter(line => line.trim());
    const result = {};
    
    for (const line of lines) {
        const match = line.match(/^(\s*)([^:]+):\s*(.*)$/);
        if (match) {
            const key = match[2].trim();
            const value = match[3].trim();
            
            if (value === '') {
                result[key] = null;
            } else if (value === 'true') {
                result[key] = true;
            } else if (value === 'false') {
                result[key] = false;
            } else if (!isNaN(value)) {
                result[key] = parseFloat(value);
            } else {
                result[key] = value;
            }
        }
    }
    
    return result;
}

// ENV file parser
function parseEnv(content) {
    const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    const result = {};
    
    for (const line of lines) {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            result[match[1].trim()] = match[2].trim();
        }
    }
    
    return result;
}

// Key-value parser
function parseKeyValue(content) {
    const lines = content.split('\n').filter(line => line.trim());
    const result = {};
    
    for (const line of lines) {
        const separator = line.includes('=') ? '=' : line.includes(':') ? ':' : null;
        if (separator) {
            const parts = line.split(separator);
            if (parts.length === 2) {
                result[parts[0].trim()] = parts[1].trim();
            }
        }
    }
    
    return result;
}

// Basic schema validation
function validateAgainstSchema(data, schema) {
    const errors = [];
    
    for (const [key, rule] of Object.entries(schema)) {
        const value = data[key];
        
        if (rule.required && (value === undefined || value === null)) {
            errors.push(`${key} is required`);
        }
        
        if (rule.type && value !== undefined && value !== null) {
            const valid = typeof value === rule.type || 
                         (rule.type === 'array' && Array.isArray(value)) ||
                         (rule.type === 'object' && typeof value === 'object' && value !== null);
            
            if (!valid) {
                errors.push(`${key} must be ${rule.type}`);
            }
        }
        
        if (rule.enum && Array.isArray(rule.enum) && !rule.enum.includes(value)) {
            errors.push(`${key} must be one of: ${rule.enum.join(', ')}`);
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Simple YAML stringify
function yamlStringify(data) {
    return Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
}

// ENV stringify
function envStringify(data) {
    return Object.entries(data)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
}

// Validate input
if (!input.action || !input.path) {
    console.log(JSON.stringify({
        error: 'Missing required parameters: action and path',
        example: {
            action: 'read',
            path: 'config.json',
            options: {
                schema: {
                    apiKey: { required: true, type: 'string' },
                    timeout: { type: 'number', default: 30 }
                }
            }
        },
        timestamp: new Date().toISOString()
    }));
    process.exit(1);
}

const result = manageConfig(input.action, input.path, input.options || {});
console.log(JSON.stringify(result));