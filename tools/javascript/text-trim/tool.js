// text-trim - Trim leading and trailing whitespace from text.
function main(params) {
  const text = typeof params?.text === 'string' ? params.text : '';
  return { text: text.trim() };
}
