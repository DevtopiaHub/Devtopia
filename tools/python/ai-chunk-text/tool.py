#!/usr/bin/env python3
# ai-chunk-text

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    text = input_data.get('text')
    size = input_data.get('size', 500)
    if not isinstance(text, str):
        print(json.dumps({"ok": False, "error": "Missing required field: text"}))
        sys.exit(1)
    try:
        size = int(size)
    except Exception:
        size = 500
    size = max(1, size)
    chunks = [text[i:i+size] for i in range(0, len(text), size)]
    print(json.dumps({"ok": True, "chunks": chunks, "count": len(chunks)}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
