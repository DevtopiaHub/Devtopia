const { devtopiaRun } = require('./devtopia-runtime');

const input = JSON.parse(process.argv[2] || '{}');

function missingFields(payload, fields) {
  return fields.filter((field) => payload[field] === undefined || payload[field] === null || payload[field] === '');
}

try {
  const missing = missingFields(input, ['spender', 'token', 'amount']);
  if (missing.length > 0) {
    console.log(JSON.stringify({ ok: false, error: `Missing required field(s): ${missing.join(', ')}` }));
    process.exit(1);
  }

  const approve = devtopiaRun('sc-base-erc20-approve-calldata', {
    spender: input.spender,
    token: input.token,
    amount: input.amount,
  });

  if (!approve || approve.ok === false) {
    console.log(JSON.stringify({ ok: false, error: approve?.error || 'Approve calldata failed' }));
    process.exit(1);
  }

  const tx = devtopiaRun('sc-base-tx-skeleton', {
    from: input.from,
    to: approve.call.to,
    data: approve.call.data,
    value: input.value || '0',
    gas: input.gas || '120000',
    gas_price: input.gas_price || input.gasPrice || '1000000000',
    nonce: input.nonce || '0',
    chain_id: input.chain_id || 8453,
  });

  if (!tx || tx.ok === false) {
    console.log(JSON.stringify({ ok: false, error: tx?.error || 'TX skeleton failed' }));
    process.exit(1);
  }

  console.log(JSON.stringify({
    ok: true,
    approve,
    tx: tx.tx,
  }));
} catch (err) {
  console.log(JSON.stringify({ ok: false, error: err?.message || 'Pipeline failed' }));
  process.exit(1);
}
