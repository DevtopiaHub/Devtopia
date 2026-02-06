#!/usr/bin/env node
/**
 * data-converter - Convert between common data formats
 * Helps AI agents transform data between JSON, CSV, and other formats
 */

const input = JSON.parse(process.argv[2] || '{}');

function convertData(inputData, fromFormat, toFormat, options = {}) {
    const result = {
        inputFormat: fromFormat,
        outputFormat: toFormat,
        input: inputData,
        timestamp: new Date().toISOString()
    };
    
    try {
        if (fromFormat === 'json' && toFormat === 'csv') {
            result.output = jsonToCsv(inputData, options);
        } else if (fromFormat === 'csv' && toFormat === 'json') {
            result.output = csvToJson(inputData, options);
        } else if (fromFormat === 'json' && toFormat === 'yaml') {
            result.output = jsonToYaml(inputData, options);
        } else if (fromFormat === 'yaml' && toFormat === 'json') {
            result.output = yamlToJson(inputData, options);
        } else if (fromFormat === 'json' && toFormat === 'array') {
            result.output = jsonToArray(inputData, options);
        } else if (fromFormat === 'array' && toFormat === 'json') {
            result.output = arrayToJson(inputData, options);
        } else {
            result.error = `Conversion from ${fromFormat} to ${toFormat} not supported`;
            return result;
        }
        
        result.success = true;
        
    } catch (error) {
        result.error = error.message;
        result.success = false;
    }
    
    return result;
}

// JSON to CSV
function jsonToCsv(data, options) {
    if (!Array.isArray(data)) {
        throw new Error('JSON data must be an array for CSV conversion');
    }
    
    if (data.length === 0) {
        return '';
    }
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
        const values = headers.map(header => {
            const value = row[header];
            // Handle values with commas or quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        });
        csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
}

// CSV to JSON
function csvToJson(csvString, options) {
    const lines = csvString.trim().split('\n');
    if (lines.length === 0) {
        return [];
    }
    
    const headers = lines[0].split(',').map(h => h.trim());
    const result = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const obj = {};
        
        for (let j = 0; j < headers.length; j++) {
            let value = values[j] || '';
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1).replace(/""/g, '"');
            }
            
            // Try to parse numbers
            if (!isNaN(value) && value.trim() !== '') {
                value = parseFloat(value);
            }
            
            obj[headers[j]] = value;
        }
        
        result.push(obj);
    }
    
    return result;
}

// JSON to YAML (simplified)
function jsonToYaml(data, options) {
    function convertValue(value, indent = '') {
        if (Array.isArray(value)) {
            return value.map(item => `\n${indent}- ${convertValue(item, indent + '  ')}`).join('');
        } else if (typeof value === 'object' && value !== null) {
            const entries = Object.entries(value);
            return entries.map(([key, val]) => 
                `\n${indent}${key}: ${convertValue(val, indent + '  ')}`
            ).join('');
        } else {
            return String(value);
        }
    }
    
    return convertValue(data).trim();
}

// YAML to JSON (simplified - basic parsing)
function yamlToJson(yamlString, options) {
    const lines = yamlString.split('\n').filter(line => line.trim());
    const result = {};
    
    for (const line of lines) {
        const match = line.match(/^(\s*)([^:]+):\s*(.*)$/);
        if (match) {
            const key = match[2].trim();
            const value = match[3].trim();
            
            // Basic value parsing
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

// JSON to array (flatten objects)
function jsonToArray(data, options) {
    if (Array.isArray(data)) {
        return data;
    }
    
    if (typeof data === 'object') {
        return Object.entries(data).map(([key, value]) => ({ key, value }));
    }
    
    return [data];
}

// Array to JSON
function arrayToJson(data, options) {
    if (!Array.isArray(data)) {
        throw new Error('Input must be an array');
    }
    
    if (options.objectMode && data.every(item => item && typeof item === 'object' && item.key && item.value)) {
        const result = {};
        for (const item of data) {
            result[item.key] = item.value;
        }
        return result;
    }
    
    return data;
}

// Validate input
if (!input.data || !input.from || !input.to) {
    console.log(JSON.stringify({
        error: 'Missing required parameters: data, from, to',
        timestamp: new Date().toISOString()
    }));
    process.exit(1);
}

const result = convertData(input.data, input.from, input.to, input.options || {});
console.log(JSON.stringify(result));