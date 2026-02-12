// text-normalize - Trim and collapse whitespace using composed tools.
const { devtopiaRun } = require('./devtopia-runtime');

function main(params) {
  const text = typeof params?.text === 'string' ? params.text : '';
  const trimmed = devtopiaRun('text-trim', { text });
  const collapsed = devtopiaRun('text-collapse', { text: trimmed.text || '' });
  return { text: collapsed.text || '' };
}
