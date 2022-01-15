Changing the type of `api.json` made the input types mandatory in the handler:

```ts
export default json(
  async (
    req: VercelRequest,
    res: VercelResponse,
  ) => {
    ...
  }
)
```

I don't really like this, but what can I do?
