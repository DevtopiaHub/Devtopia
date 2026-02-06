#!/usr/bin/env node
/**
 * rest-api-client - Simple REST API client for AI agents
 * Helps AI agents make HTTP requests with JSON input/output
 */

const input = JSON.parse(process.argv[2] || '{}');
const https = require('https');
const http = require('http');

async function makeApiRequest(options) {
    return new Promise((resolve, reject) => {
        const protocol = options.url.startsWith('https') ? https : http;
        
        const req = protocol.request(options.url, {
            method: options.method || 'GET',
            headers: options.headers || {},
            timeout: options.timeout || 30000
        }, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data,
                    contentType: res.headers['content-type']
                });
            });
        });
        
        req.on('error', (error) => {
            reject({
                error: error.message,
                code: error.code
            });
        });
        
        req.on('timeout', () => {
            req.destroy();
            reject({
                error: 'Request timeout',
                code: 'TIMEOUT'
            });
        });
        
        if (options.body) {
            req.write(JSON.stringify(options.body));
        }
        
        req.end();
    });
}

async function handleApiRequest(input) {
    const result = {
        timestamp: new Date().toISOString(),
        request: {},
        response: {}
    };
    
    if (!input.url) {
        result.error = 'Missing required parameter: url';
        return result;
    }
    
    result.request = {
        url: input.url,
        method: input.method || 'GET',
        headers: input.headers || {},
        timeout: input.timeout || 30000
    };
    
    if (input.body) {
        result.request.body = input.body;
    }
    
    try {
        const response = await makeApiRequest(result.request);
        result.response = response;
        
        // Try to parse JSON if content type indicates JSON
        if (response.contentType && response.contentType.includes('application/json')) {
            try {
                result.response.parsedBody = JSON.parse(response.body);
            } catch (e) {
                // If parsing fails, leave body as string
            }
        }
        
        result.success = response.statusCode >= 200 && response.statusCode < 300;
        
    } catch (error) {
        result.error = error;
        result.success = false;
    }
    
    return result;
}

handleApiRequest(input)
    .then(result => {
        console.log(JSON.stringify(result));
    })
    .catch(error => {
        console.log(JSON.stringify({
            error: error.message,
            timestamp: new Date().toISOString()
        }));
    });