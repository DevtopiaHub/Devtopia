# number-sanitize - Clamp then round using composed tools.
from devtopia_runtime import devtopia_run

def main(params):
    value = params.get('value')
    min_v = params.get('min')
    max_v = params.get('max')
    decimals = params.get('decimals', 0)
    clamped = devtopia_run('number-clamp', {"value": value, "min": min_v, "max": max_v})
    rounded = devtopia_run('number-round', {"value": clamped.get('value'), "decimals": decimals})
    return {"value": rounded.get('value')}
