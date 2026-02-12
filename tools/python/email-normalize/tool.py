# email-normalize - Normalize email casing and whitespace.

def main(params):
    email = params.get('email') if isinstance(params, dict) else ''
    if not email:
        return {"error": "email required"}
    return {"email": str(email).strip().lower()}
