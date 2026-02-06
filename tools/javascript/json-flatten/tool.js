/**
 * JSON Flatten
 * 
 * Flatten nested JSON into dot-notation key-value pairs.
 * Inverse of json-pick - great for exploring API responses.
 * 
 * @category data
 * @input { "data": { "user": { "name": "Alice" } } }
 */

const input = JSON.parse(process.argv[2] || '{}');
const data = input.data || input.json || input;
const maxDepth = input.maxDepth || input.depth || 10;
const delimiter = input.delimiter || '.';

function flatten(obj, prefix = '', depth = 0) {
  if (depth > maxDepth) return { [prefix]: '[max depth]' };
  
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}${delimiter}${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flatten(value, newKey, depth + 1));
    } else if (Array.isArray(value)) {
      result[newKey] = `[Array(${value.length})]`;
      value.forEach((item, i) => {
        if (item && typeof item === 'object') {
          Object.assign(result, flatten(item, `${newKey}[${i}]`, depth + 1));
        } else {
          result[`${newKey}[${i}]`] = item;
        }
      });
    } else {
      result[newKey] = value;
    }
  }
  
  return result;
}

const flattened = flatten(data);
const paths = Object.keys(flattened);

console.log(JSON.stringify({
  flattened,
  paths,
  totalPaths: paths.length,
  maxDepthUsed: maxDepth
}));
