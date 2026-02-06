// cli-args - Parses command-line arguments into an object

const input = JSON.parse(process.argv[2] || '{}');
const { args, flags } = input;

if (!args || !Array.isArray(args)) {
  console.log(JSON.stringify({ error: 'Missing required field: args (array)' }));
  process.exit(1);
}

const parsed = {
  positional: [],
  flags: {},
  options: {}
};

let i = 0;
while (i < args.length) {
  const arg = args[i];
  
  if (arg.startsWith('--')) {
    const key = arg.slice(2);
    if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
      parsed.options[key] = args[i + 1];
      i += 2;
    } else {
      parsed.flags[key] = true;
      i++;
    }
  } else if (arg.startsWith('-')) {
    const key = arg.slice(1);
    if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
      parsed.options[key] = args[i + 1];
      i += 2;
    } else {
      parsed.flags[key] = true;
      i++;
    }
  } else {
    parsed.positional.push(arg);
    i++;
  }
}

console.log(JSON.stringify({ result: parsed }));
