[**iterkit**](../README.md)

***

[iterkit](../globals.md) / throwError

# Function: throwError()

> **throwError**(`err`): [`GenFn`](../type-aliases/GenFn.md)\<`never`\>

Defined in: [producers.ts:102](https://github.com/Idicious/iterkit/blob/beefb03138960e7ad33cf0e7c7b803de00a0bd5b/src/producers.ts#L102)

Creates an async generator function that throws an error.

## Parameters

### err

`unknown`

The error to throw.

## Returns

[`GenFn`](../type-aliases/GenFn.md)\<`never`\>

A generator function that throws the provided error.

## Example

```ts @import.meta.vitest
const { throwError } = await import("iterkit");

const source = throwError(new Error("Test error"));
const resultP = Array.fromAsync(source());

await expect(resultP).rejects.toThrow("Test error");
```
