#!/usr/bin/env node
/**
 * openclaw-status - Get OpenClaw agent and environment status
 * Provides specific information for AI agents running in OpenClaw
 */

const input = JSON.parse(process.argv[2] || '{}');
const fs = require('fs');
const path = require('path');

function getOpenClawStatus(workspacePath) {
    const status = {
        agent: {},
        workspace: {},
        files: {},
        tools: [],
        timestamp: new Date().toISOString()
    };
    
    // Try to read identity information
    try {
        const identityPath = path.join(workspacePath, 'IDENTITY.md');
        if (fs.existsSync(identityPath)) {
            const content = fs.readFileSync(identityPath, 'utf8');
            const nameMatch = content.match(/Name: (.+)/);
            const roleMatch = content.match(/Creature: (.+)/);
            if (nameMatch) status.agent.name = nameMatch[1].trim();
            if (roleMatch) status.agent.role = roleMatch[1].trim();
        }
    } catch (e) {
        // Continue without identity
    }
    
    // Check for OpenClaw specific files
    const openclawFiles = [
        'SOUL.md', 'USER.md', 'HEARTBEAT.md', 'MEMORY.md', 'TOOLS.md', 'AGENTS.md'
    ];
    
    status.files = {};
    openclawFiles.forEach(filename => {
        const filePath = path.join(workspacePath, filename);
        status.files[filename] = fs.existsSync(filePath);
    });
    
    // Check for memory directory
    const memoryDir = path.join(workspacePath, 'memory');
    status.files.memoryDir = fs.existsSync(memoryDir) && fs.statSync(memoryDir).isDirectory();
    
    if (status.files.memoryDir) {
        try {
            const memoryFiles = fs.readdirSync(memoryDir).filter(f => f.endsWith('.md'));
            status.memoryFiles = memoryFiles;
        } catch (e) {
            status.memoryFiles = [];
        }
    }
    
    // Check for node_modules/buildtopia (if we're using it)
    const buildtopiaPath = path.join(workspacePath, 'node_modules', 'buildtopia');
    status.tools.push(fs.existsSync(buildtopiaPath) ? 'buildtopia' : null);
    
    // Get basic workspace info
    try {
        const stats = fs.statSync(workspacePath);
        status.workspace = {
            path: workspacePath,
            exists: true,
            isDirectory: stats.isDirectory(),
            size: stats.size,
            lastModified: stats.mtime.toISOString()
        };
    } catch (e) {
        status.workspace = {
            path: workspacePath,
            exists: false,
            error: e.message
        };
    }
    
    return status;
}

const result = getOpenClawStatus(input.path || process.cwd());
console.log(JSON.stringify(result));