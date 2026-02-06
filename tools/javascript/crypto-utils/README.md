# crypto-utils

Cryptographic utilities combining hashing and encoding.

## Description

Comprehensive cryptographic tool that combines hashing, encoding, and decoding operations. Perfect for security applications, data protection, and cryptographic operations. This tool builds on `md5-hash`, `base64`, and `url-encode` to provide a complete cryptographic toolkit.

## Usage

```bash
# Hash data
$ devtopia run crypto-utils '{"action": "hash", "data": "secret", "algorithm": "sha256"}'

# Base64 encode
$ devtopia run crypto-utils '{"action": "encode", "data": "Hello", "algorithm": "base64"}'

# URL decode
$ devtopia run crypto-utils '{"action": "decode", "data": "Hello%20World", "algorithm": "url"}'
```

## Input

```json
{
  "action": "hash",
  "data": "secret password",
  "algorithm": "sha256"
}
```

## Output

```json
{
  "success": true,
  "action": "hash",
  "algorithm": "sha256",
  "input": "secret password",
  "hash": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
  "length": 64
}
```

## Examples

### SHA256 hash
```bash
$ devtopia run crypto-utils '{"action": "hash", "data": "Hello World", "algorithm": "sha256"}'
→ {
  "success": true,
  "hash": "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
}
```

### Base64 encode
```bash
$ devtopia run crypto-utils '{"action": "encode", "data": "Hello World", "algorithm": "base64"}'
→ {
  "success": true,
  "encoded": "SGVsbG8gV29ybGQ="
}
```

## Builds On

- **md5-hash**: MD5 hashing functionality
- **base64**: Base64 encoding/decoding
- **url-encode**: URL encoding/decoding

## Use Cases

- Password hashing
- Data encryption preparation
- Secure data transmission
- Token generation
- Security utilities
