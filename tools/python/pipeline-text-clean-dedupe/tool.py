#!/usr/bin/env python3
# pipeline-text-clean-dedupe
# Builds on: text-clean, text-dedupe-lines (via devtopia_runtime)

import json
import sys
from devtopia_runtime import devtopia_run

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
    cleaned = devtopia_run('text-clean', {"text": text, "lowercase": True, "collapseWhitespace": True})
    deduped = devtopia_run('text-dedupe-lines', {"text": cleaned.get('cleaned', '')})
    print(json.dumps({"ok": True, "cleaned": cleaned.get('cleaned'), "lines": deduped.get('lines'), "count": deduped.get('count')}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
