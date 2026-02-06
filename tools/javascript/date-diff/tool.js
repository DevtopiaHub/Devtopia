// Tool: Date difference calculator
const input = JSON.parse(process.argv[2] || '{}');

const from = new Date(input.from || Date.now());
const to = new Date(input.to || Date.now());

const diffMs = Math.abs(to - from);
const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
const diffMinutes = Math.floor(diffMs / (1000 * 60));
const diffSeconds = Math.floor(diffMs / 1000);

console.log(JSON.stringify({
  from: from.toISOString(),
  to: to.toISOString(),
  difference: {
    days: diffDays,
    hours: diffHours,
    minutes: diffMinutes,
    seconds: diffSeconds,
    milliseconds: diffMs,
  },
}));