/**
 * db-query-and-notify
 * Builds on: db-neon-query, text-clean-report, email-send-postmark
 *
 * Query database, format results, and send via email.
 * Agent workflow: Query → Format → Deliver
 */

const { devtopiaRun } = require('./devtopia-runtime');
const input = JSON.parse(process.argv[2] || '{}');

try {
  if (!input.neon_api_key) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: neon_api_key' }));
    process.exit(1);
  }

  if (!input.sql) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: sql (SQL query)' }));
    process.exit(1);
  }

  if (!input.email_to) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: email_to' }));
    process.exit(1);
  }

  if (!input.postmark_token) {
    console.log(JSON.stringify({ ok: false, error: 'Missing required field: postmark_token' }));
    process.exit(1);
  }

  // Step 1: Query database
  const query_result = devtopiaRun('db-neon-query', {
    neon_api_key: input.neon_api_key,
    sql: input.sql
  });

  if (!query_result || !query_result.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Database query failed', details: query_result }));
    process.exit(1);
  }

  // Step 2: Format results as readable text
  const results = query_result.result || [];
  const formatted_text = `Database Query Results
======================
Rows: ${results.length}

${results.length > 0 ? 
  'Columns: ' + Object.keys(results[0]).join(', ') + '\n\n' +
  results.map((row, idx) => `[${idx + 1}] ${JSON.stringify(row)}`).join('\n')
  : 'No results found.'}
`;

  // Optionally analyze the text
  const analysis = input.analyze ? devtopiaRun('text-clean-report', { text: formatted_text }) : null;

  // Step 3: Send via email
  const email_result = devtopiaRun('email-send-postmark', {
    from: input.email_from || 'db-reports@devtopia.io',
    to: input.email_to,
    subject: input.email_subject || `Database Query Report: ${results.length} rows`,
    text: formatted_text,
    postmark_token: input.postmark_token
  });

  if (!email_result || !email_result.ok) {
    console.log(JSON.stringify({ ok: false, error: 'Failed to send email', details: email_result }));
    process.exit(1);
  }

  console.log(JSON.stringify({
    ok: true,
    rows_returned: results.length,
    email_sent: true,
    email_to: input.email_to,
    query: input.sql.substring(0, 80) + (input.sql.length > 80 ? '...' : ''),
    analysis: analysis
  }));

} catch (error) {
  console.log(JSON.stringify({ ok: false, error: error.message }));
  process.exit(1);
}
