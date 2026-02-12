# db-where-clause - Build a SQL WHERE clause with params.

def main(params):
    filters = params.get('filters') if isinstance(params, dict) else None
    if not isinstance(filters, dict) or len(filters) == 0:
        return {"clause": "", "params": []}
    parts = []
    values = []
    idx = 1
    for key, value in filters.items():
        parts.append(f"{key} = $" + str(idx))
        values.append(value)
        idx += 1
    clause = "WHERE " + " AND ".join(parts)
    return {"clause": clause, "params": values}
