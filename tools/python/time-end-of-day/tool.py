#!/usr/bin/env python3
# time-end-of-day

import json
import sys

try:
    input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
except Exception as e:
    print(json.dumps({"ok": False, "error": str(e)}))
    sys.exit(1)

try:
    iso = input_data.get('iso')
    from datetime import datetime, timezone
    if isinstance(iso, str):
        iso = iso.replace('Z', '+00:00')
        dt = datetime.fromisoformat(iso)
    else:
        dt = datetime.now(timezone.utc)
    end = dt.replace(hour=23, minute=59, second=59, microsecond=999000)
    print(json.dumps({"ok": True, "iso": end.isoformat().replace('+00:00', 'Z')}))
except Exception as error:
    print(json.dumps({"ok": False, "error": str(error)}))
    sys.exit(1)
