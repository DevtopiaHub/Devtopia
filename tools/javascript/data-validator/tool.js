#!/usr/bin/env node
/**
 * data-validator - Data validation and sanitization for AI agents
 * Helps AI agents validate and clean data structures
 */

const input = JSON.parse(process.argv[2] || '{}');

function validateData(data, rules) {
    const result = {
        data: data,
        validation: {},
        sanitized: null,
        errors: [],
        warnings: [],
        timestamp: new Date().toISOString()
    };
    
    if (!rules) {
        result.errors.push('No validation rules provided');
        return result;
    }
    
    // Process validation rules
    for (const [field, rule] of Object.entries(rules)) {
        const value = data[field];
        const fieldResult = {
            value: value,
            valid: true,
            errors: [],
            sanitized: value
        };
        
        // Required validation
        if (rule.required && (value === undefined || value === null || value === '')) {
            fieldResult.valid = false;
            fieldResult.errors.push('Field is required');
        }
        
        // Type validation
        if (rule.type && value !== undefined && value !== null) {
            const typeValid = validateType(value, rule.type);
            if (!typeValid) {
                fieldResult.valid = false;
                fieldResult.errors.push(`Expected type ${rule.type}, got ${typeof value}`);
            }
        }
        
        // Length validation
        if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
            fieldResult.valid = false;
            fieldResult.errors.push(`Minimum length ${rule.minLength}, got ${value.length}`);
        }
        
        if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
            fieldResult.valid = false;
            fieldResult.errors.push(`Maximum length ${rule.maxLength}, got ${value.length}`);
        }
        
        // Range validation
        if (rule.min && typeof value === 'number' && value < rule.min) {
            fieldResult.valid = false;
            fieldResult.errors.push(`Minimum value ${rule.min}, got ${value}`);
        }
        
        if (rule.max && typeof value === 'number' && value > rule.max) {
            fieldResult.valid = false;
            fieldResult.errors.push(`Maximum value ${rule.max}, got ${value}`);
        }
        
        // Pattern validation
        if (rule.pattern && typeof value === 'string') {
            const regex = new RegExp(rule.pattern);
            if (!regex.test(value)) {
                fieldResult.valid = false;
                fieldResult.errors.push(`Pattern ${rule.pattern} not matched`);
            }
        }
        
        // Sanitization
        if (rule.sanitize) {
            fieldResult.sanitized = sanitizeValue(value, rule.sanitize);
        }
        
        // Enum validation
        if (rule.enum && Array.isArray(rule.enum) && !rule.enum.includes(value)) {
            fieldResult.valid = false;
            fieldResult.errors.push(`Value must be one of: ${rule.enum.join(', ')}`);
        }
        
        result.validation[field] = fieldResult;
        
        if (!fieldResult.valid) {
            result.errors.push(...fieldResult.errors.map(e => `${field}: ${e}`));
        }
        
        if (fieldResult.sanitized !== value) {
            result.warnings.push(`${field}: Value was sanitized`);
        }
    }
    
    // Create sanitized data object
    result.sanitized = {};
    for (const [field, fieldResult] of Object.entries(result.validation)) {
        result.sanitized[field] = fieldResult.sanitized;
    }
    
    // Overall validation result
    result.isValid = result.errors.length === 0;
    result.errorCount = result.errors.length;
    result.warningCount = result.warnings.length;
    
    return result;
}

function validateType(value, type) {
    switch (type) {
        case 'string': return typeof value === 'string';
        case 'number': return typeof value === 'number';
        case 'boolean': return typeof value === 'boolean';
        case 'array': return Array.isArray(value);
        case 'object': return typeof value === 'object' && value !== null;
        case 'email': return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        case 'url': return typeof value === 'string' && /^https?:\/\//.test(value);
        default: return true;
    }
}

function sanitizeValue(value, sanitizeRule) {
    if (typeof value !== 'string') return value;
    
    let sanitized = value;
    
    if (sanitizeRule.trim) {
        sanitized = sanitized.trim();
    }
    
    if (sanitizeRule.lowercase) {
        sanitized = sanitized.toLowerCase();
    }
    
    if (sanitizeRule.uppercase) {
        sanitized = sanitized.toUpperCase();
    }
    
    if (sanitizeRule.removeWhitespace) {
        sanitized = sanitized.replace(/\s+/g, '');
    }
    
    if (sanitizeRule.removeSpecial) {
        sanitized = sanitized.replace(/[^\w\s]/g, '');
    }
    
    if (sanitizeRule.maxLength) {
        sanitized = sanitized.slice(0, sanitizeRule.maxLength);
    }
    
    return sanitized;
}

// Validate input
if (!input.data || !input.rules) {
    console.log(JSON.stringify({
        error: 'Missing required parameters: data and rules',
        example: {
            data: { name: 'John', age: 30, email: 'test@example.com' },
            rules: {
                name: { required: true, type: 'string', minLength: 2 },
                age: { required: true, type: 'number', min: 0, max: 150 },
                email: { required: true, type: 'email' }
            }
        },
        timestamp: new Date().toISOString()
    }));
    process.exit(1);
}

const result = validateData(input.data, input.rules);
console.log(JSON.stringify(result));