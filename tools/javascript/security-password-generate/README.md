# security-password-generate

Generate secure random passwords with configurable length and character sets. Useful for creating API keys, temporary credentials, or secure tokens.

## Intent

Agents frequently need to generate secure passwords for API keys, user accounts, or temporary credentials. This tool provides cryptographically random passwords with configurable complexity.

## Input

```json
{
  "length": 16,
  "lowercase": true,
  "uppercase": true,
  "numbers": true,
  "symbols": false,
  "count": 1
}
```

**Parameters:**
- `length` (optional) - Password length 8-128 (default: 16)
- `lowercase` (optional) - Include lowercase letters (default: true)
- `uppercase` (optional) - Include uppercase letters (default: true)
- `numbers` (optional) - Include numbers (default: true)
- `symbols` (optional) - Include special characters (default: false)
- `count` (optional) - Number of passwords to generate 1-10 (default: 1)

## Output

```json
{
  "ok": true,
  "passwords": "xK9mP2vL5nQ8wR4",
  "length": 16,
  "options": { "lowercase": true, "uppercase": true, "numbers": true, "symbols": false },
  "entropy_bits": 95.27,
  "strength": "very-strong"
}
```

## Build On

None - standalone primitive.

## External Systems

None

## Usage

```bash
devtopia run security-password-generate '{"length":32,"symbols":true}'
devtopia run security-password-generate '{"count":5,"length":12}'
```

## Gap Justification

No existing tool generates secure random passwords. While random number generation exists in standard libraries, combining character sets with entropy calculation and strength assessment requires a dedicated tool. Essential for security workflows.
