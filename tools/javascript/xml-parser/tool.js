#!/usr/bin/env node
/**
 * xml-parser - Parse XML strings into JSON objects
 */
const input = JSON.parse(process.argv[2] || '{}');
const { xml } = input;

if (!xml) {
  console.log(JSON.stringify({ error: 'Missing required parameter: xml' }));
  process.exit(1);
}

function parseXML(xmlString) {
  const result = {};
  const stack = [result];
  let current = result;
  let currentTag = null;
  let currentText = '';
  
  const tagRegex = /<\/?([^>\s]+)([^>]*)>/g;
  let match;
  let lastIndex = 0;
  
  while ((match = tagRegex.exec(xmlString)) !== null) {
    const [fullMatch, tagName, attributes] = match;
    const isClosing = fullMatch.startsWith('</');
    const isSelfClosing = fullMatch.endsWith('/>');
    
    // Capture text before tag
    const textBefore = xmlString.substring(lastIndex, match.index).trim();
    if (textBefore && currentTag) {
      if (typeof current[currentTag] === 'object' && current[currentTag] !== null && !Array.isArray(current[currentTag])) {
        current[currentTag]._text = textBefore;
      } else {
        current[currentTag] = textBefore;
      }
    }
    
    if (isClosing) {
      if (currentTag === tagName && stack.length > 1) {
        stack.pop();
        current = stack[stack.length - 1];
        currentTag = null;
      }
    } else if (isSelfClosing) {
      if (!current[tagName]) {
        current[tagName] = {};
      } else if (!Array.isArray(current[tagName])) {
        current[tagName] = [current[tagName]];
      }
      const attrs = {};
      if (attributes) {
        const attrRegex = /(\w+)="([^"]*)"/g;
        let attrMatch;
        while ((attrMatch = attrRegex.exec(attributes)) !== null) {
          attrs[attrMatch[1]] = attrMatch[2];
        }
      }
      if (Array.isArray(current[tagName])) {
        current[tagName].push(attrs);
      } else {
        current[tagName] = { ...attrs };
      }
    } else {
      if (!current[tagName]) {
        current[tagName] = {};
      } else if (!Array.isArray(current[tagName])) {
        current[tagName] = [current[tagName]];
        current[tagName] = [current[tagName][0], {}];
      } else {
        current[tagName].push({});
      }
      
      const attrs = {};
      if (attributes) {
        const attrRegex = /(\w+)="([^"]*)"/g;
        let attrMatch;
        while ((attrMatch = attrRegex.exec(attributes)) !== null) {
          attrs[attrMatch[1]] = attrMatch[2];
        }
      }
      
      const newObj = Array.isArray(current[tagName]) 
        ? current[tagName][current[tagName].length - 1]
        : current[tagName];
      Object.assign(newObj, attrs);
      
      if (Array.isArray(current[tagName])) {
        current = current[tagName][current[tagName].length - 1];
      } else {
        current = current[tagName];
      }
      stack.push(current);
      currentTag = tagName;
    }
    
    lastIndex = tagRegex.lastIndex;
  }
  
  // Handle remaining text
  const remainingText = xmlString.substring(lastIndex).trim();
  if (remainingText && currentTag) {
    if (typeof current === 'object' && current !== null) {
      current._text = remainingText;
    }
  }
  
  return result;
}

try {
  const parsed = parseXML(xml);
  console.log(JSON.stringify({ parsed }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
