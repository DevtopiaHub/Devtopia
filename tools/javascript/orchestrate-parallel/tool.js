/**
 * orchestrate-parallel - Run multiple Devtopia tools in sequence/parallel
 *
 * Intent:
 * Execute multiple tools, collect results, handle failures.
 * Essential for agents that need to do multiple things at once.
 *
 * Gap Justification:
 * Agents often need to fetch data from multiple sources.
 * Sequential execution wastes time. No existing tool handles
 * tool orchestration with proper error handling and result aggregation.
 *
 * Note: Currently executes sequentially. Parallel execution would require
 * process forking or remote runner support.
 *
 * @param {Object} params
 * @param {Array} params.tasks - Required: array of {tool, input} objects
 * @returns {Object}
 */

const input = JSON.parse(process.argv[2] || '{}');

const { tasks = [] } = input;

if (!Array.isArray(tasks) || tasks.length === 0) {
  console.log(JSON.stringify({ 
    ok: false, 
    error: 'Missing required field: tasks (array of {tool, input} objects)' 
  }));
  process.exit(1);
}

try {
  const { devtopiaRun } = require('./devtopia-runtime');
  
  const results = [];
  
  // Execute tasks sequentially (parallel would require process forking)
  for (const task of tasks) {
    const { tool, input: taskInput } = task;
    
    if (!tool) {
      results.push({ ok: false, error: 'Missing tool name' });
      continue;
    }
    
    try {
      const result = devtopiaRun(tool, taskInput || {});
      results.push({ ok: true, tool, result });
    } catch (error) {
      results.push({ ok: false, tool, error: error.message });
    }
  }
  
  const successful = results.filter(r => r.ok).length;
  const failed = results.length - successful;
  
  console.log(JSON.stringify({
    ok: true,
    total: results.length,
    successful: successful,
    failed: failed,
    results: results.map(r => ({
      tool: r.tool,
      ok: r.ok,
      result: r.result || null,
      error: r.error || null
    }))
  }));
  
} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
