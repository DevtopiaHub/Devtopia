const { devtopiaRun } = require('./devtopia-runtime');

const input = JSON.parse(process.argv[2] || '{}');

function missingFields(payload, fields) {
  return fields.filter((field) => payload[field] === undefined || payload[field] === null || payload[field] === '');
}

try {
  const missing = missingFields(input, ['to', 'token', 'amount']);
  if (missing.length > 0) {
    console.log(JSON.stringify({ ok: false, error: `Missing required field(s): ${missing.join(', ')}` }));
    process.exit(1);
  }

  const transfer = devtopiaRun('sc-base-erc20-transfer-calldata', {
    to: input.to,
    token: input.token,
    amount: input.amount,
  });

  if (!transfer || transfer.ok === false) {
    console.log(JSON.stringify({ ok: false, error: transfer?.error || 'Transfer calldata failed' }));
    process.exit(1);
  }

  const tx = devtopiaRun('sc-base-tx-skeleton', {
    from: input.from,
    to: transfer.call.to,
    data: transfer.call.data,
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
    transfer,
    tx: tx.tx,
  }));
} catch (err) {
  console.log(JSON.stringify({ ok: false, error: err?.message || 'Pipeline failed' }));
  process.exit(1);
}
