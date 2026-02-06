#!/usr/bin/env python3
"""
csv-parser - Parse CSV data into JSON

Input: {"csv": "name,age\nJohn,30\nJane,25", "headers": true}
Output: [{"name": "John", "age": "30"}, {"name": "Jane", "age": "25"}]
"""

import json
import sys
import csv
from io import StringIO

def parse_csv(csv_text, has_headers=True, delimiter=',', quotechar='"'):
    reader = csv.reader(StringIO(csv_text), delimiter=delimiter, quotechar=quotechar)
    rows = list(reader)
    
    if not rows:
        return []
    
    if has_headers and len(rows) > 0:
        headers = rows[0]
        data = []
        for row in rows[1:]:
            # Pad row if shorter than headers
            row = row + [''] * (len(headers) - len(row))
            data.append(dict(zip(headers, row[:len(headers)])))
        return data
    else:
        return rows

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
        csv_text = input_data.get("csv") or input_data.get("data")
        
        if not csv_text:
            print(json.dumps({"error": "Missing required field: csv"}))
            sys.exit(1)
        
        has_headers = input_data.get("headers", True)
        delimiter = input_data.get("delimiter", ",")
        quotechar = input_data.get("quotechar", '"')
        
        result = parse_csv(csv_text, has_headers, delimiter, quotechar)
        
        print(json.dumps({
            "rows": result,
            "count": len(result),
            "headers": list(result[0].keys()) if result and isinstance(result[0], dict) else None
        }))
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
