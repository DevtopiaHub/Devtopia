#!/usr/bin/env node
/**
 * agent-logger - Simple logging system for AI agents
 * Helps AI agents create structured logs with different levels and formats
 */

const input = JSON.parse(process.argv[2] || '{}');
const fs = require('fs');
const path = require('path');

function createLogEntry(logData, options = {}) {
    const result = {
        log: {},
        written: false,
        fileInfo: {},
        timestamp: new Date().toISOString()
    };
    
    // Validate required fields
    if (!logData.level || !logData.message) {
        result.error = 'Missing required fields: level and message';
        return result;
    }
    
    // Create log entry
    const logEntry = {
        timestamp: new Date().toISOString(),
        level: logData.level.toLowerCase(),
        message: logData.message,
        agent: logData.agent || 'unknown',
        context: logData.context || {},
        data: logData.data || null
    };
    
    result.log = logEntry;
    
    // Write to file if path provided
    if (options.filePath) {
        try {
            const logFile = path.resolve(options.filePath);
            const logDir = path.dirname(logFile);
            
            // Create directory if it doesn't exist
            if (!fs.existsSync(logDir)) {
                fs.mkdirSync(logDir, { recursive: true });
            }
            
            // Format log entry based on options
            let logLine;
            if (options.format === 'json') {
                logLine = JSON.stringify(logEntry) + '\n';
            } else if (options.format === 'simple') {
                logLine = `[${logEntry.timestamp}] ${logEntry.level.toUpperCase()}: ${logEntry.message}\n`;
            } else {
                // Default: structured text
                logLine = `
TIMESTAMP: ${logEntry.timestamp}
LEVEL: ${logEntry.level.toUpperCase()}
AGENT: ${logEntry.agent}
MESSAGE: ${logEntry.message}
${logEntry.data ? 'DATA: ' + JSON.stringify(logEntry.data, null, 2) : ''}
${Object.keys(logEntry.context).length ? 'CONTEXT: ' + JSON.stringify(logEntry.context, null, 2) : ''}
---
`;
            }
            
            // Append to file
            fs.appendFileSync(logFile, logLine);
            
            result.written = true;
            result.fileInfo = {
                path: logFile,
                format: options.format || 'structured'
            };
            
            // Get file stats
            const stats = fs.statSync(logFile);
            result.fileInfo.size = stats.size;
            result.fileInfo.modified = stats.mtime.toISOString();
            
        } catch (error) {
            result.error = `Failed to write log: ${error.message}`;
            result.written = false;
        }
    }
    
    return result;
}

// Validate input
if (!input.level || !input.message) {
    console.log(JSON.stringify({
        error: 'Missing required parameters: level and message',
        example: {
            level: 'info',
            message: 'Task completed successfully',
            agent: 'worker-agent',
            context: { taskId: '123' },
            options: {
                filePath: 'logs/agent.log',
                format: 'json'
            }
        },
        timestamp: new Date().toISOString()
    }));
    process.exit(1);
}

const result = createLogEntry(input, input.options || {});
console.log(JSON.stringify(result));