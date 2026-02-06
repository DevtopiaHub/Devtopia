/**
 * Timezone Converter
 * 
 * Convert times between timezones or list current time across zones.
 * 
 * @category time
 * @input { "time": "14:30", "from": "America/New_York", "to": "Asia/Tokyo" }
 */

const input = JSON.parse(process.argv[2] || '{}');

const ZONES = {
  // Shortcuts
  'UTC': 0, 'GMT': 0,
  'EST': -5, 'EDT': -4, 'CST': -6, 'CDT': -5,
  'MST': -7, 'MDT': -6, 'PST': -8, 'PDT': -7,
  'CET': 1, 'CEST': 2, 'GMT+8': 8, 'SGT': 8,
  'JST': 9, 'KST': 9, 'IST': 5.5, 'AEST': 10,
  // Full names (common ones)
  'America/New_York': -5, 'America/Los_Angeles': -8,
  'America/Chicago': -6, 'America/Denver': -7,
  'Europe/London': 0, 'Europe/Paris': 1, 'Europe/Berlin': 1,
  'Asia/Tokyo': 9, 'Asia/Singapore': 8, 'Asia/Shanghai': 8,
  'Asia/Kolkata': 5.5, 'Australia/Sydney': 11,
};

function getOffset(zone) {
  if (typeof zone === 'number') return zone;
  return ZONES[zone] ?? ZONES[zone.toUpperCase()] ?? null;
}

function parseTime(str) {
  const match = str.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) return null;
  return { h: parseInt(match[1]), m: parseInt(match[2]), s: parseInt(match[3] || 0) };
}

function formatTime(h, m) {
  const hh = ((h % 24) + 24) % 24;
  return `${String(hh).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// Mode 1: Convert specific time
if (input.time && input.from && input.to) {
  const time = parseTime(input.time);
  const fromOff = getOffset(input.from);
  const toOff = getOffset(input.to);
  
  if (!time) {
    console.log(JSON.stringify({ error: "Invalid time format. Use HH:MM" }));
    process.exit(1);
  }
  if (fromOff === null || toOff === null) {
    console.log(JSON.stringify({ error: "Unknown timezone", available: Object.keys(ZONES) }));
    process.exit(1);
  }
  
  const utcH = time.h - fromOff;
  const targetH = utcH + toOff;
  const dayShift = targetH < 0 ? -1 : targetH >= 24 ? 1 : 0;
  
  console.log(JSON.stringify({
    input: { time: input.time, from: input.from, to: input.to },
    result: formatTime(targetH, time.m),
    dayShift: dayShift === 0 ? 'same day' : dayShift > 0 ? 'next day' : 'previous day'
  }));
}
// Mode 2: Show current time across zones
else {
  const zones = input.zones || ['UTC', 'EST', 'PST', 'CET', 'JST', 'SGT'];
  const now = new Date();
  const utcH = now.getUTCHours();
  const utcM = now.getUTCMinutes();
  
  const times = {};
  for (const z of zones) {
    const off = getOffset(z);
    if (off !== null) {
      times[z] = formatTime(utcH + off, utcM);
    }
  }
  
  console.log(JSON.stringify({
    utc: formatTime(utcH, utcM),
    zones: times,
    date: now.toISOString().split('T')[0]
  }));
}
