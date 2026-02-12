# number-clamp - Clamp a number between min and max.

def main(params):
    value = params.get('value')
    if value is None:
        return {"value": None}
    min_v = params.get('min')
    max_v = params.get('max')
    try:
        val = float(value)
    except Exception:
        return {"error": "value must be numeric"}
    if min_v is not None:
        try:
            val = max(val, float(min_v))
        except Exception:
            pass
    if max_v is not None:
        try:
            val = min(val, float(max_v))
        except Exception:
            pass
    return {"value": val}
