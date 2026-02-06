#!/usr/bin/env python3
# text-kebab-case

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    text = input_data.get('text')
    if not isinstance(text, str):
        print(json.dumps({"ok": False, "error": "Missing required field: text"}))
        sys.exit(1)
    parts = [p.lower() for p in __import__('re').split(r'[^a-zA-Z0-9]+', text.strip()) if p]
    out = '-'.join(parts)
    print(json.dumps({"ok": True, "text": out}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
