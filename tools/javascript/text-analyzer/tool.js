#!/usr/bin/env node
/**
 * text-analyzer - Advanced text analysis with multiple metrics
 * 
 * Comprehensive text analysis tool that combines word counting, character analysis,
 * readability metrics, and text statistics. Perfect for content analysis and NLP tasks.
 * 
 * Usage: node text-analyzer.js '{"text": "Hello world", "metrics": ["words", "chars", "readability"]}'
 * 
 * Options:
 * - text: Text to analyze (required)
 * - metrics: Array of metrics to calculate (default: all)
 * 
 * Builds on: text-stats, truncate-text
 */

const input = JSON.parse(process.argv[2] || '{}');

// Word count and basic stats (composing text-stats)
function getWordStats(text) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  
  // Reading time (average 200 words per minute)
  const readingTime = Math.ceil(words.length / 200);
  
  return {
    wordCount: words.length,
    charCount: chars,
    charCountNoSpaces: charsNoSpaces,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    readingTimeMinutes: readingTime,
    avgWordsPerSentence: words.length / (sentences.length || 1),
    avgCharsPerWord: charsNoSpaces / (words.length || 1)
  };
}

// Readability metrics
function getReadability(text) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Simple Flesch Reading Ease approximation
  const avgSentenceLength = words.length / (sentences.length || 1);
  const avgSyllablesPerWord = estimateSyllables(words);
  
  // Simplified Flesch score (0-100, higher = easier)
  const fleschScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
  
  let level = 'Very Difficult';
  if (fleschScore >= 90) level = 'Very Easy';
  else if (fleschScore >= 80) level = 'Easy';
  else if (fleschScore >= 70) level = 'Fairly Easy';
  else if (fleschScore >= 60) level = 'Standard';
  else if (fleschScore >= 50) level = 'Fairly Difficult';
  else if (fleschScore >= 30) level = 'Difficult';
  
  return {
    fleschScore: Math.round(fleschScore * 10) / 10,
    level,
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100
  };
}

function estimateSyllables(words) {
  let totalSyllables = 0;
  for (const word of words) {
    const wordLower = word.toLowerCase();
    let syllables = 1;
    if (wordLower.length > 2) {
      syllables = wordLower.match(/[aeiouy]+/g)?.length || 1;
      if (wordLower.endsWith('e')) syllables--;
      if (syllables < 1) syllables = 1;
    }
    totalSyllables += syllables;
  }
  return totalSyllables / (words.length || 1);
}

// Character frequency analysis
function getCharFrequency(text) {
  const freq = {};
  for (const char of text.toLowerCase()) {
    if (char.match(/[a-z]/)) {
      freq[char] = (freq[char] || 0) + 1;
    }
  }
  
  const sorted = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([char, count]) => ({ char, count }));
  
  return sorted;
}

async function main() {
  if (!input.text) {
    console.log(JSON.stringify({ error: 'Missing required field: text' }));
    process.exit(1);
  }
  
  const metrics = input.metrics || ['all'];
  const includeAll = metrics.includes('all');
  
  const result = {
    text: input.truncate ? input.text.slice(0, 100) + '...' : input.text,
    textLength: input.text.length
  };
  
  if (includeAll || metrics.includes('words') || metrics.includes('stats')) {
    result.stats = getWordStats(input.text);
  }
  
  if (includeAll || metrics.includes('readability')) {
    result.readability = getReadability(input.text);
  }
  
  if (includeAll || metrics.includes('frequency')) {
    result.charFrequency = getCharFrequency(input.text);
  }
  
  console.log(JSON.stringify({
    success: true,
    ...result
  }));
}

main();
