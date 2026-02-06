#!/usr/bin/env python3
# text-dedupe-lines

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    text = input_data.get('text')
    lines = input_data.get('lines')
    if isinstance(lines, list):
        raw_lines = [str(x) for x in lines]
    elif isinstance(text, str):
        raw_lines = text.splitlines()
    else:
        print(json.dumps({"ok": False, "error": "Missing required field: text or lines"}))
        sys.exit(1)
    seen = set()
    out = []
    for line in raw_lines:
        if line in seen:
            continue
        seen.add(line)
        out.append(line)
    print(json.dumps({"ok": True, "lines": out, "count": len(out)}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
