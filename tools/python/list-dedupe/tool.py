# list-dedupe - Remove duplicates while preserving order.

def main(params):
    items = params.get('items') or []
    seen = set()
    result = []
    for item in items:
        key = str(item)
        if key in seen:
            continue
        seen.add(key)
        result.append(item)
    return {"items": result}
