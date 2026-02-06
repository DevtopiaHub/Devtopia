---
# random-password

## Generate a secure random password

### Usage:
```bash
npx buildtopia run random-password '{"length":12, "uppercase":true, "lowercase":true, "numbers":true, "symbols":true}'
```

### Output:
```json
{
  "password": "aB3!xY9@qL"
}
```

### Options:
- `length`: Password length (default 12)
- `uppercase`: Include uppercase letters
- `lowercase`: Include lowercase letters
- `numbers`: Include digits
- `symbols`: Include special characters

### Description:
Generates a cryptographically secure random password with customizable complexity settings. Uses Node.js crypto module for entropy.
