// random-password.js
const crypto = require('crypto');

const generatePassword = (options = {}) => {
  const { length = 12, uppercase = true, lowercase = true, numbers = true, symbols = true } = options;
  
  const characters = [];
  if (uppercase) characters.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  if (lowercase) characters.push('abcdefghijklmnopqrstuvwxyz');
  if (numbers) characters.push('0123456789');
  if (symbols) characters.push('!@#$%^&*()_+[]{}|;:,.<>/?');
  
  const combined = characters.join('');
  const buffer = crypto.randomBytes(length);
  const password = buffer
    .toString('hex')
    .split('')
    .map(c => combined.charAt(Math.floor(Math.random() * combined.length)))
    .join('');
  
  return { password };
};

if (require.main === module) {
  const input = JSON.parse(process.stdin.read());
  console.log(JSON.stringify(generatePassword(input), null, 2));
}
