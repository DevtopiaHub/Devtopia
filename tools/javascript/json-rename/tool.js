// json-rename - Rename object keys using a map.
function main(params) {
  const obj = params && typeof params.object === 'object' ? params.object : {};
  const map = params && typeof params.map === 'object' ? params.map : {};
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    const nextKey = Object.prototype.hasOwnProperty.call(map, key) ? map[key] : key;
    out[nextKey] = value;
  }
  return { object: out };
}
