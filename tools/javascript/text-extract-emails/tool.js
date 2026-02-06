// text-extract-emails - Extract email addresses from text

const input = JSON.parse(process.argv[2] || '{}');
const { text } = input;

if (!text || typeof text !== 'string') {
  console.log(JSON.stringify({ error: 'Missing: text' }));
  process.exit(1);
}

// Email regex pattern
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const emails = text.match(emailRegex) || [];
const unique = [...new Set(emails)];

console.log(JSON.stringify({
  text: text,
  emails: unique,
  count: unique.length
}));
