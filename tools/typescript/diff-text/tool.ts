#!/usr/bin/env npx ts-node
/**
 * diff-text - Compare two strings and show differences
 * 
 * Input: {"a": "hello world", "b": "hello there"}
 * Output: {"different": true, "changes": [...]}
 */

interface Input {
  a: string;
  b: string;
  mode?: 'chars' | 'words' | 'lines';
}

interface Change {
  type: 'equal' | 'insert' | 'delete';
  value: string;
  position?: number;
}

function diffChars(a: string, b: string): Change[] {
  const changes: Change[] = [];
  let i = 0, j = 0;
  
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) {
      // Find run of equal chars
      let equal = '';
      while (i < a.length && j < b.length && a[i] === b[j]) {
        equal += a[i];
        i++;
        j++;
      }
      changes.push({ type: 'equal', value: equal });
    } else if (j < b.length && (i >= a.length || a.indexOf(b[j], i) === -1)) {
      // Insertion
      changes.push({ type: 'insert', value: b[j], position: j });
      j++;
    } else if (i < a.length) {
      // Deletion
      changes.push({ type: 'delete', value: a[i], position: i });
      i++;
    }
  }
  
  return changes;
}

function diffWords(a: string, b: string): Change[] {
  const wordsA = a.split(/\s+/);
  const wordsB = b.split(/\s+/);
  const changes: Change[] = [];
  
  let i = 0, j = 0;
  
  while (i < wordsA.length || j < wordsB.length) {
    if (i < wordsA.length && j < wordsB.length && wordsA[i] === wordsB[j]) {
      changes.push({ type: 'equal', value: wordsA[i] });
      i++;
      j++;
    } else if (j < wordsB.length && !wordsA.includes(wordsB[j])) {
      changes.push({ type: 'insert', value: wordsB[j] });
      j++;
    } else if (i < wordsA.length && !wordsB.includes(wordsA[i])) {
      changes.push({ type: 'delete', value: wordsA[i] });
      i++;
    } else if (i < wordsA.length) {
      changes.push({ type: 'delete', value: wordsA[i] });
      i++;
    } else {
      changes.push({ type: 'insert', value: wordsB[j] });
      j++;
    }
  }
  
  return changes;
}

function diffLines(a: string, b: string): Change[] {
  const linesA = a.split('\n');
  const linesB = b.split('\n');
  const changes: Change[] = [];
  
  const setA = new Set(linesA);
  const setB = new Set(linesB);
  
  let i = 0, j = 0;
  
  while (i < linesA.length || j < linesB.length) {
    if (i < linesA.length && j < linesB.length && linesA[i] === linesB[j]) {
      changes.push({ type: 'equal', value: linesA[i] });
      i++;
      j++;
    } else if (j < linesB.length && !setA.has(linesB[j])) {
      changes.push({ type: 'insert', value: linesB[j] });
      j++;
    } else if (i < linesA.length && !setB.has(linesA[i])) {
      changes.push({ type: 'delete', value: linesA[i] });
      i++;
    } else if (i < linesA.length) {
      changes.push({ type: 'delete', value: linesA[i] });
      i++;
    } else {
      changes.push({ type: 'insert', value: linesB[j] });
      j++;
    }
  }
  
  return changes;
}

function main() {
  const input: Input = JSON.parse(process.argv[2] || '{}');
  
  if (!input.a || !input.b) {
    console.log(JSON.stringify({ error: 'Missing required fields: a, b (strings to compare)' }));
    process.exit(1);
  }
  
  const mode = input.mode || 'words';
  let changes: Change[];
  
  switch (mode) {
    case 'chars':
      changes = diffChars(input.a, input.b);
      break;
    case 'lines':
      changes = diffLines(input.a, input.b);
      break;
    default:
      changes = diffWords(input.a, input.b);
  }
  
  const insertions = changes.filter(c => c.type === 'insert').length;
  const deletions = changes.filter(c => c.type === 'delete').length;
  
  console.log(JSON.stringify({
    different: input.a !== input.b,
    mode,
    stats: {
      insertions,
      deletions,
      unchanged: changes.filter(c => c.type === 'equal').length
    },
    changes: changes.slice(0, 50), // Limit output
    summary: insertions + deletions === 0 
      ? 'Strings are identical' 
      : `${insertions} insertions, ${deletions} deletions`
  }));
}

main();
