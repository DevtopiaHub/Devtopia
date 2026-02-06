const { random } = require('crypto');

const input = JSON.parse(process.argv[2]);
const { length = 12, includeSpecial = true } = input;

let password = random.randomBytes(length).toString('hex');
if (includeSpecial) {
  const specialChars = '!@#$%^&*()_+~`|}{][:;,.<>/?';
  const special = specialChars.split('').sort(() => 0.5 - Math.random()).join('');
  password = password.split('').concat(special).sort(() => 0.5 - Math.random()).join('');
}

console.log(JSON.stringify({ password }));