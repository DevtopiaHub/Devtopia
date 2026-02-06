// Tool: Random string generator
const input = JSON.parse(process.argv[2] || '{}');

const charsets = {
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  numeric: '0123456789',
  hex: '0123456789abcdef',
};

const length = Math.min(input.length || 16, 1000);
const charset = charsets[input.charset] || charsets.alphanumeric;

let result = '';
for (let i = 0; i < length; i++) {
  result += charset[Math.floor(Math.random() * charset.length)];
}

console.log(JSON.stringify({ string: result, length: result.length, charset: input.charset || 'alphanumeric' }));