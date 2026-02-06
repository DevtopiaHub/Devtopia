/**
 * Convert a string to a URL-friendly slug
 * @param {Object} params - Slug parameters
 * @param {string} params.text - Text to convert to slug
 * @param {string} params.separator - Separator character (default: '-')
 * @param {boolean} params.lowercase - Convert to lowercase (default: true)
 * @returns {string} URL-friendly slug
 */
function main(params) {
  const { text, separator = '-', lowercase = true } = params;

  if (typeof text !== 'string') {
    throw new Error('Text must be a string');
  }

  let slug = text
    .trim()
    // Replace spaces and underscores with separator
    .replace(/[\s_]+/g, separator)
    // Remove special characters except separator
    .replace(/[^\w\-]+/g, '')
    // Replace multiple separators with single separator
    .replace(new RegExp(`\\${separator}+`, 'g'), separator)
    // Remove leading/trailing separators
    .replace(new RegExp(`^\\${separator}|\\${separator}$`, 'g'), '');

  if (lowercase) {
    slug = slug.toLowerCase();
  }

  return slug;
}
