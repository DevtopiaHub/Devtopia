// json-shape - Pluck and rename keys using composed tools.
const { devtopiaRun } = require('./devtopia-runtime');

function main(params) {
  const obj = params && typeof params.object === 'object' ? params.object : {};
  const keys = Array.isArray(params?.keys) ? params.keys : [];
  const map = params && typeof params.map === 'object' ? params.map : {};
  const plucked = devtopiaRun('json-pluck', { object: obj, keys });
  const renamed = devtopiaRun('json-rename', { object: plucked.object || {}, map });
  return { object: renamed.object || {} };
}
