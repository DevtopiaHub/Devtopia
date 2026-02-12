# api-request-plan-py - Build a deterministic API request plan.
from urllib.parse import urlparse, urlunparse, parse_qsl, urlencode

def main(params):
    if not isinstance(params, dict):
        return {"error": "params required"}

    base_url = params.get('base_url')
    token = params.get('token')
    method = params.get('method', 'GET')
    query_params = params.get('params', {})

    if not base_url:
        return {"error": "base_url required"}
    if not token:
        return {"error": "token required"}

    parsed = urlparse(str(base_url))
    query_list = list(parse_qsl(parsed.query))
    if isinstance(query_params, dict):
        for key, value in query_params.items():
            if value is None:
                continue
            query_list.append((str(key), str(value)))

    query_list.sort(key=lambda item: item[0])
    final_query = urlencode(query_list)

    final_url = urlunparse((parsed.scheme, parsed.netloc, parsed.path, parsed.params, final_query, ''))

    return {
        "method": str(method).upper(),
        "url": final_url,
        "headers": {"Authorization": "Bearer " + str(token)},
        "body": params.get('body') if isinstance(params, dict) else None,
    }
