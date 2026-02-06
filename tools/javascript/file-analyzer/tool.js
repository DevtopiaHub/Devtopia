#!/usr/bin/env node
/**
 * file-analyzer - Analyze file contents and provide metadata
 * Helps AI agents understand file types, sizes, and basic characteristics
 */

const input = JSON.parse(process.argv[2] || '{}');
const fs = require('fs');
const path = require('path');

function analyzeFile(filePath) {
    const result = {
        path: filePath,
        exists: false,
        basicInfo: {},
        contentInfo: {},
        timestamp: new Date().toISOString()
    };
    
    try {
        const stats = fs.statSync(filePath);
        result.exists = true;
        result.basicInfo = {
            size: stats.size,
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory(),
            lastModified: stats.mtime.toISOString(),
            created: stats.birthtime.toISOString(),
            extension: path.extname(filePath).toLowerCase()
        };
        
        // If it's a file and reasonable size, analyze content
        if (stats.isFile() && stats.size < 1024 * 1024) { // 1MB limit
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const lines = content.split('\n');
                
                result.contentInfo = {
                    lineCount: lines.length,
                    characterCount: content.length,
                    wordCount: content.split(/\s+/).filter(word => word.length > 0).length,
                    hasBinary: /[\x00-\x08\x0E-\x1F]/.test(content),
                    isEmpty: content.trim().length === 0
                };
                
                // Detect common file types based on content/extension
                if (filePath.endsWith('.md') || filePath.endsWith('.markdown')) {
                    result.contentInfo.type = 'markdown';
                    result.contentInfo.hasHeaders = /^#\s+.+$/m.test(content);
                } else if (filePath.endsWith('.json')) {
                    result.contentInfo.type = 'json';
                    try {
                        JSON.parse(content);
                        result.contentInfo.validJson = true;
                    } catch (e) {
                        result.contentInfo.validJson = false;
                    }
                } else if (filePath.endsWith('.js')) {
                    result.contentInfo.type = 'javascript';
                    result.contentInfo.hasFunctions = /function\s+\w+|const\s+\w+\s*=\s*\(|^export\s+/.test(content);
                } else if (filePath.endsWith('.py')) {
                    result.contentInfo.type = 'python';
                    result.contentInfo.hasFunctions = /def\s+\w+/.test(content);
                }
                
            } catch (readError) {
                result.contentInfo = { error: 'Unable to read file content' };
            }
        }
        
    } catch (error) {
        result.error = error.message;
    }
    
    return result;
}

const filePath = input.path || input.file;
if (!filePath) {
    console.log(JSON.stringify({ error: 'Missing "path" or "file" parameter' }));
    process.exit(1);
}

const result = analyzeFile(filePath);
console.log(JSON.stringify(result));