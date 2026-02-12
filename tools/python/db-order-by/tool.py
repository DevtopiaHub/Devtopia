# db-order-by - Build a SQL ORDER BY clause.

def main(params):
    fields = params.get('fields') if isinstance(params, dict) else None
    if not isinstance(fields, list) or len(fields) == 0:
        return {"clause": ""}
    cleaned = [str(f).strip() for f in fields if str(f).strip()]
    if not cleaned:
        return {"clause": ""}
    return {"clause": "ORDER BY " + ", ".join(cleaned)}
