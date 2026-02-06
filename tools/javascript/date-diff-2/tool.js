const input = JSON.parse(process.argv[2]);
const date1 = new Date(input.date1);
const date2 = new Date(input.date2);
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
console.log(JSON.stringify({ difference: diffDays }));