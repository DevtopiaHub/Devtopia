const { random } = require('mathjs');

module.exports = async (input) => {
  const { length = 16, includeUppercase = true, includeLowercase = true, includeNumbers = true, includeSymbols = true, excludeAmbiguous = true, pinCode = false } = input;
  
  // Character sets
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>/?';
  
  // Exclude ambiguous characters
  const ambiguousChars = ['0', 'O', '1', 'I', 'l', 'L', '8', 'B', '8'];
  const cleanedSymbols = symbols.split('').filter(c => !ambiguousChars.includes(c)).join('');
  
  // Combine character sets based on options
  let charSet = '';
  if (includeUppercase) charSet += uppercase;
  if (includeLowercase) charSet += lowercase;
  if (includeNumbers) charSet += numbers;
  if (includeSymbols) charSet += cleanedSymbols;
  
  // Ensure at least one character from each selected set
  let password = '';
  if (includeUppercase) password += uppercase[randomInt(0, uppercase.length - 1)];
  if (includeLowercase) password += lowercase[randomInt(0, lowercase.length - 1)];
  if (includeNumbers) password += numbers[randomInt(0, numbers.length - 1)];
  if (includeSymbols) password += cleanedSymbols[randomInt(0, cleanedSymbols.length - 1)];
  
  // Fill remaining characters
  for (let i = password.length; i < length; i++) {
    password += charSet[randomInt(0, charSet.length - 1)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => 0.5 - Math.random()).join('');
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}