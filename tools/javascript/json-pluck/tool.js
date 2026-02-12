// json-pluck - Pick keys from an object.
function main(params) {
  const obj = params && typeof params.object === 'object' ? params.object : {};
  const keys = Array.isArray(params?.keys) ? params.keys : [];
  const out = {};
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      out[key] = obj[key];
    }
  }
  return { object: out };
}
