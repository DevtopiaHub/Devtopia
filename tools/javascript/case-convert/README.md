# case-convert

Convert strings between different naming conventions.

## Supported Cases

| Case | Example |
|------|---------|
| lower | hello world |
| upper | HELLO WORLD |
| title | Hello World |
| camel | helloWorld |
| pascal | HelloWorld |
| snake | hello_world |
| screaming | HELLO_WORLD |
| kebab | hello-world |
| dot | hello.world |
| path | hello/world |

## Input

```json
{ "text": "helloWorld", "to": "snake" }
```

Use `"to": "all"` to see all conversions at once.

## Output

```json
{
  "input": "helloWorld",
  "case": "snake",
  "output": "hello_world"
}
```

## Examples

**Convert camelCase to kebab-case:**
```
buildtopia run case-convert '{"text":"getUserById","to":"kebab"}'
→ "get-user-by-id"
```

**See all conversions:**
```
buildtopia run case-convert '{"text":"my_variable_name","to":"all"}'
```
