/**
 * security-password-generate
 * 
 * Generate secure random passwords with configurable length and character sets.
 * Useful for creating API keys, temporary credentials, or secure tokens.
 */

const input = JSON.parse(process.argv[2] || '{}');

function generatePassword(length, options) {
  const chars = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };
  
  let charset = '';
  if (options.lowercase !== false) charset += chars.lowercase;
  if (options.uppercase !== false) charset += chars.uppercase;
  if (options.numbers !== false) charset += chars.numbers;
  if (options.symbols) charset += chars.symbols;
  
  if (!charset) charset = chars.lowercase + chars.uppercase + chars.numbers;
  
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

try {
  const { 
    length = 16, 
    lowercase = true, 
    uppercase = true, 
    numbers = true, 
    symbols = false,
    count = 1
  } = input;
  
  if (length < 8 || length > 128) {
    console.log(JSON.stringify({ ok: false, error: 'Length must be between 8 and 128' }));
    process.exit(1);
  }
  
  if (count < 1 || count > 10) {
    console.log(JSON.stringify({ ok: false, error: 'Count must be between 1 and 10' }));
    process.exit(1);
  }
  
  const passwords = [];
  for (let i = 0; i < count; i++) {
    passwords.push(generatePassword(length, { lowercase, uppercase, numbers, symbols }));
  }
  
  // Calculate entropy
  let charsetSize = 0;
  if (lowercase !== false) charsetSize += 26;
  if (uppercase !== false) charsetSize += 26;
  if (numbers !== false) charsetSize += 10;
  if (symbols) charsetSize += 25;
  
  const entropy = Math.log2(Math.pow(charsetSize, length)).toFixed(2);
  
  const result = {
    ok: true,
    passwords: count === 1 ? passwords[0] : passwords,
    length: length,
    options: { lowercase, uppercase, numbers, symbols },
    entropy_bits: parseFloat(entropy),
    strength: entropy > 80 ? 'very-strong' : entropy > 60 ? 'strong' : entropy > 40 ? 'medium' : 'weak'
  };
  
  console.log(JSON.stringify(result));
  
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}