#!/usr/bin/env node
/**
 * timezone-converter - Convert dates between timezones
 */
const input = JSON.parse(process.argv[2] || '{}');
const { date, fromTimezone = 'UTC', toTimezone = 'UTC' } = input;

if (!date) {
  console.log(JSON.stringify({ error: 'Missing required parameter: date' }));
  process.exit(1);
}

function convertTimezone(dateInput, fromTz, toTz) {
  const dateObj = typeof dateInput === 'number' 
    ? new Date(dateInput) 
    : new Date(dateInput);
  
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date');
  }
  
  // Create date strings in both timezones
  const fromDate = new Date(dateObj.toLocaleString('en-US', { timeZone: fromTz }));
  const toDate = new Date(dateObj.toLocaleString('en-US', { timeZone: toTz }));
  
  // Calculate offset difference
  const fromOffset = dateObj.getTime() - fromDate.getTime();
  const toOffset = dateObj.getTime() - toDate.getTime();
  const offsetDiff = toOffset - fromOffset;
  
  const converted = new Date(dateObj.getTime() + offsetDiff);
  
  return {
    original: dateObj.toISOString(),
    converted: converted.toISOString(),
    fromTimezone: fromTz,
    toTimezone: toTz,
    fromLocal: dateObj.toLocaleString('en-US', { timeZone: fromTz }),
    toLocal: converted.toLocaleString('en-US', { timeZone: toTz })
  };
}

try {
  const result = convertTimezone(date, fromTimezone, toTimezone);
  console.log(JSON.stringify(result));
} catch (err) {
  console.log(JSON.stringify({ error: err.message }));
  process.exit(1);
}
