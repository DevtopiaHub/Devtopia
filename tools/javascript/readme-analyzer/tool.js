#!/usr/bin/env node
/**
 * readme-analyzer - Analyze README files for structure and content
 * Helps AI agents understand project documentation quality and completeness
 */

const input = JSON.parse(process.argv[2] || '{}');
const fs = require('fs');
const path = require('path');

function analyzeReadme(filePath) {
    const result = {
        path: filePath,
        exists: false,
        structure: {},
        content: {},
        quality: {},
        timestamp: new Date().toISOString()
    };
    
    try {
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
            result.error = 'Path is not a file';
            return result;
        }
        
        result.exists = true;
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        // Basic content analysis
        result.content = {
            lineCount: lines.length,
            characterCount: content.length,
            wordCount: content.split(/\s+/).filter(word => word.length > 0).length,
            isEmpty: content.trim().length === 0
        };
        
        // Structure analysis
        const headings = lines.filter(line => line.match(/^#+\s+.+/));
        const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
        const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
        const images = content.match(/!\[([^\]]*)\]\(([^)]+)\)/g) || [];
        
        result.structure = {
            hasHeadings: headings.length > 0,
            headingCount: headings.length,
            headingLevels: [...new Set(headings.map(h => h.match(/^#+/)[0].length))].sort(),
            hasCodeBlocks: codeBlocks.length > 0,
            codeBlockCount: codeBlocks.length,
            hasLinks: links.length > 0,
            linkCount: links.length,
            hasImages: images.length > 0,
            imageCount: images.length
        };
        
        // Quality assessment
        const hasInstallation = /install|setup|getting started/i.test(content);
        const hasUsage = /usage|example|how to use/i.test(content);
        const hasApi = /api|interface|method/i.test(content);
        const hasLicense = /license|copyright|mit|apache/i.test(content);
        const hasContributing = /contributing|contribute|pull request/i.test(content);
        
        // Check for specific sections
        const sections = {
            installation: hasInstallation,
            usage: hasUsage,
            api: hasApi,
            license: hasLicense,
            contributing: hasContributing
        };
        
        result.quality = {
            hasEssentialSections: hasInstallation && hasUsage,
            sectionCoverage: Object.values(sections).filter(Boolean).length,
            totalPossibleSections: Object.keys(sections).length,
            sections: sections,
            completenessScore: Math.round((Object.values(sections).filter(Boolean).length / Object.keys(sections).length) * 100)
        };
        
        // Readme-specific metrics
        result.hasTitle = /^#\s+.+$/m.test(content);
        result.hasDescription = content.split('\n').slice(1, 5).some(line => line.trim().length > 20);
        
    } catch (error) {
        result.error = error.message;
    }
    
    return result;
}

let filePath = input.path || input.file;
if (!filePath) {
    const currentDir = process.cwd();
    const possiblePaths = ['README.md', 'readme.md', 'Readme.md'];
    
    for (const possiblePath of possiblePaths) {
        const fullPath = path.join(currentDir, possiblePath);
        if (fs.existsSync(fullPath)) {
            filePath = fullPath;
            break;
        }
    }
    
    if (!filePath) {
        console.log(JSON.stringify({ error: 'No README file found in current directory' }));
        process.exit(1);
    }
}

const result = analyzeReadme(filePath);
console.log(JSON.stringify(result));