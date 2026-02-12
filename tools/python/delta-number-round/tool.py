# delta-number-round - Round a number to a fixed precision.

def main(params):
    value = params.get('value')
    if value is None:
        return {"value": None}
    decimals = params.get('decimals', 0)
    try:
        dec = int(decimals)
        val = float(value)
    except Exception:
        return {"error": "value and decimals must be numeric"}
    return {"value": round(val, dec)}
