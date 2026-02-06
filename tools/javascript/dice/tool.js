/**
 * Dice Roller
 * 
 * Roll dice using standard notation (2d6, 1d20+5, etc.)
 * 
 * @category util
 * @input { "roll": "2d6+3" }
 */

const input = JSON.parse(process.argv[2] || '{}');
const roll = input.roll || input.dice || input.d || '1d6';

// Parse dice notation: NdS+M or NdS-M
const match = roll.match(/^(\d+)?d(\d+)([+-]\d+)?$/i);

if (!match) {
  console.log(JSON.stringify({ 
    error: "Invalid dice notation", 
    format: "NdS or NdS+M (e.g., 2d6, 1d20+5, 3d8-2)",
    examples: ["1d6", "2d6", "1d20", "3d8+5", "4d6-1"]
  }));
  process.exit(1);
}

const count = parseInt(match[1] || '1');
const sides = parseInt(match[2]);
const modifier = parseInt(match[3] || '0');

if (count < 1 || count > 100) {
  console.log(JSON.stringify({ error: "Dice count must be 1-100" }));
  process.exit(1);
}
if (sides < 2 || sides > 1000) {
  console.log(JSON.stringify({ error: "Dice sides must be 2-1000" }));
  process.exit(1);
}

const rolls = [];
for (let i = 0; i < count; i++) {
  rolls.push(Math.floor(Math.random() * sides) + 1);
}

const sum = rolls.reduce((a, b) => a + b, 0);
const total = sum + modifier;
const min = count + modifier;
const max = count * sides + modifier;

console.log(JSON.stringify({
  notation: roll,
  rolls,
  sum,
  modifier: modifier || undefined,
  total,
  stats: {
    min,
    max,
    average: (min + max) / 2
  }
}));
