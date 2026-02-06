#!/usr/bin/env node
/**
 * zip-compress - Compress text data using simple compression algorithms
 */
const input = JSON.parse(process.argv[2] || '{}');
const { data, algorithm = 'gzip' } = input;

if (!data) {
  console.log(JSON.stringify({ error: 'Missing required parameter: data' }));
  process.exit(1);
}

function compressGzip(text) {
  // Simple run-length encoding for demonstration
  let compressed = '';
  let count = 1;
  
  for (let i = 0; i < text.length; i++) {
    if (text[i] === text[i + 1]) {
      count++;
    } else {
      if (count > 3) {
        compressed += `[${count}${text[i]}]`;
      } else {
        compressed += text[i].repeat(count);
      }
      count = 1;
    }
  }
  
  return compressed;
}

function compressBase64(text) {
  return Buffer.from(text).toString('base64');
}

function calculateCompressionRatio(original, compressed) {
  return {
    originalSize: original.length,
    compressedSize: compressed.length,
    ratio: (compressed.length / original.length * 100).toFixed(2) + '%',
    saved: original.length - compressed.length
  };
}

try {
  let compressed;
  
  if (algorithm === 'gzip' || algorithm === 'rle') {
    compressed = compressGzip(String(data));
  } else if (algorithm === 'base64') {
    compressed = compressBase64(String(data));
  } else {
    console.log(JSON.stringify({ error: 'Unknown algorithm. Use "gzip", "rle", or "base64"' }));
    process.exit(1);
  }
  
  const stats = calculateCompressionRatio(String(data), compressed);
  
  console.log(JSON.stringify({
    compressed,
    algorithm,
    ...stats
  }));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
