# delta-sql-select-plan - Compose WHERE + ORDER BY into a select plan.
from devtopia_runtime import devtopia_run

def main(params):
    table = params.get('table') if isinstance(params, dict) else ''
    if not table:
        return {"error": "table required"}
    where = devtopia_run('delta-sql-where-clause', {"filters": params.get('filters', {})})
    order_by = devtopia_run('delta-sql-order-by', {"fields": params.get('fields', [])})
    limit = params.get('limit') if isinstance(params, dict) else None
    clause = " ".join([c for c in [where.get('clause'), order_by.get('clause')] if c])
    limit_clause = f" LIMIT {int(limit)}" if isinstance(limit, int) else ''
    query = f"SELECT * FROM {table} {clause}{limit_clause}".strip()
    return {"query": query, "params": where.get('params', [])}
