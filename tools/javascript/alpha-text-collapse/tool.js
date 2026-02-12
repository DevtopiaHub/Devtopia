// alpha-text-collapse - Collapse internal whitespace to single spaces.
function main(params) {
  const text = typeof params?.text === 'string' ? params.text : '';
  return { text: text.replace(/\\s+/g, ' ').trim() };
}
