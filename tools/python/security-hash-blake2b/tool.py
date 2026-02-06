#!/usr/bin/env python3
# security-hash-blake2b

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
    import hashlib
    digest = hashlib.blake2b(text.encode('utf-8')).hexdigest()
    print(json.dumps({"ok": True, "hash": digest}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
