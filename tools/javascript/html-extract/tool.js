// html-extract - Extracts text content from HTML

const input = JSON.parse(process.argv[2] || '{}');
const { html, tags } = input;

if (!html) {
  console.log(JSON.stringify({ error: 'Missing required field: html' }));
  process.exit(1);
}

// Simple HTML tag removal (basic implementation)
let text = html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/\s+/g, ' ')
  .trim();

if (tags && Array.isArray(tags)) {
  // Extract specific tags
  const extracted = {};
  for (const tag of tags) {
    const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi');
    const matches = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      matches.push(match[1].trim());
    }
    extracted[tag] = matches;
  }
  console.log(JSON.stringify({ result: extracted }));
} else {
  console.log(JSON.stringify({ result: text }));
}
