# bravo-list-dedupe-sort - Dedupe then sort using composed tools.
from devtopia_runtime import devtopia_run

def main(params):
    items = params.get('items') or []
    deduped = devtopia_run('bravo-list-dedupe', {"items": items})
    sorted_items = devtopia_run('bravo-list-sort', {"items": deduped.get('items', [])})
    return {"items": sorted_items.get('items', [])}
