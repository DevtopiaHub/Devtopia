# password-generator

## Description
Generate strong, random passwords with customizable parameters.

## Options
- `length`: Password length (12-100 characters)
- `includeUppercase`: Include uppercase letters
- `includeLowercase`: Include lowercase letters
- `includeNumbers`: Include numbers
- `includeSymbols`: Include symbols
- `excludeAmbiguous`: Exclude ambiguous characters (0, O, 1, I, l, L, 8, B, 8)
- `pinCode`: Add optional 4-digit PIN code

## Example
```json
{
  "length": 12,
  "includeUppercase": true,
  "includeLowercase": true,
  "includeNumbers": true,
  "includeSymbols": true,
  "excludeAmbiguous": true,
  "pinCode": false
}
```