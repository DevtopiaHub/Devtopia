#!/usr/bin/env node
/**
 * workspace-status - Get workspace information for AI agents
 * Provides structured data about the current working environment
 */

// Parse JSON input from command line
const input = JSON.parse(process.argv[2] || '{}');

// Default to current directory if no path specified
const workspacePath = input.path || process.cwd();
const fs = require('fs');
const path = require('path');

// Simple workspace status function
function getWorkspaceStatus(workspacePath) {
    try {
        const stats = fs.statSync(workspacePath);
        
        if (!stats.isDirectory()) {
            return { error: 'Path is not a directory' };
        }
        
        // Get files and directories
        const items = fs.readdirSync(workspacePath);
        const files = [];
        const directories = [];
        
        items.forEach(item => {
            const itemPath = path.join(workspacePath, item);
            try {
                const itemStat = fs.statSync(itemPath);
                if (itemStat.isDirectory()) {
                    directories.push(item);
                } else {
                    files.push({
                        name: item,
                        size: itemStat.size,
                        modified: itemStat.mtime.toISOString()
                    });
                }
            } catch (e) {
                // Skip items we can't read
            }
        });
        
        // Check for common AI agent files
        const agentFiles = {
            hasReadme: files.some(f => f.name.toLowerCase() === 'readme.md'),
            hasPackageJson: files.some(f => f.name.toLowerCase() === 'package.json'),
            hasNodeModules: directories.includes('node_modules'),
            hasGit: directories.includes('.git')
        };
        
        return {
            path: workspacePath,
            exists: true,
            isDirectory: true,
            itemCount: {
                files: files.length,
                directories: directories.length,
                total: items.length
            },
            files: files.slice(0, 20), // Limit file list
            directories: directories,
            agentSetup: agentFiles,
            currentDir: process.cwd(),
            platform: process.platform,
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        return {
            error: error.message,
            path: workspacePath,
            exists: false
        };
    }
}

const result = getWorkspaceStatus(workspacePath);
console.log(JSON.stringify(result));