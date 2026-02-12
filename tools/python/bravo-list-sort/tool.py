# bravo-list-sort - Sort list items lexicographically.

def main(params):
    items = params.get('items') or []
    normalized = [str(x) for x in items]
    normalized.sort()
    return {"items": normalized}
