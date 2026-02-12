# charlie-email-validate-format - Basic email format validation.
import re

EMAIL_RE = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')

def main(params):
    email = params.get('email') if isinstance(params, dict) else ''
    if not email:
        return {"error": "email required", "valid": False}
    normalized = str(email).strip().lower()
    return {"email": normalized, "valid": bool(EMAIL_RE.match(normalized))}
