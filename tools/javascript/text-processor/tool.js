#!/usr/bin/env node
/**
 * text-processor - Advanced text processing and analysis
 * Helps AI agents transform, analyze, and extract information from text
 */

const input = JSON.parse(process.argv[2] || '{}');

function processText(text, operations) {
    const result = {
        original: text,
        length: text.length,
        wordCount: text.split(/\s+/).filter(word => word.length > 0).length,
        lineCount: text.split('\n').length,
        operations: {},
        timestamp: new Date().toISOString()
    };
    
    let processed = text;
    
    // Apply operations
    if (operations.toLowerCase) {
        processed = processed.toLowerCase();
        result.operations.lowercase = processed;
    }
    
    if (operations.uppercase) {
        processed = processed.toUpperCase();
        result.operations.uppercase = processed;
    }
    
    if (operations.trim) {
        processed = processed.trim();
        result.operations.trim = processed;
    }
    
    if (operations.removeWhitespace) {
        processed = processed.replace(/\s+/g, ' ');
        result.operations.removeWhitespace = processed;
    }
    
    if (operations.removePunctuation) {
        processed = processed.replace(/[^\w\s]/g, '');
        result.operations.removePunctuation = processed;
    }
    
    if (operations.extractNumbers) {
        const numbers = processed.match(/\d+(\.\d+)?/g) || [];
        result.operations.extractNumbers = numbers.map(n => parseFloat(n));
    }
    
    if (operations.extractWords) {
        const words = processed.match(/\b\w+\b/g) || [];
        result.operations.extractWords = words;
    }
    
    if (operations.extractEmails) {
        const emails = processed.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) || [];
        result.operations.extractEmails = emails;
    }
    
    if (operations.extractUrls) {
        const urls = processed.match(/https?:\/\/[^\s]+/g) || [];
        result.operations.extractUrls = urls;
    }
    
    if (operations.countFrequency) {
        const words = processed.toLowerCase().match(/\b\w+\b/g) || [];
        const frequency = {};
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });
        
        // Sort by frequency
        result.operations.countFrequency = Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, operations.countFrequency === true ? 10 : operations.countFrequency)
            .map(([word, count]) => ({ word, count }));
    }
    
    if (operations.splitLines) {
        result.operations.splitLines = processed.split('\n').filter(line => line.trim());
    }
    
    if (operations.splitWords) {
        result.operations.splitWords = processed.split(/\s+/).filter(word => word);
    }
    
    // Final processed text
    result.processed = processed;
    result.finalLength = processed.length;
    result.finalWordCount = processed.split(/\s+/).filter(word => word.length > 0).length;
    
    return result;
}

// Validate input
if (!input.text) {
    console.log(JSON.stringify({
        error: 'Missing required parameter: text',
        timestamp: new Date().toISOString()
    }));
    process.exit(1);
}

const result = processText(input.text, input.operations || {});
console.log(JSON.stringify(result));