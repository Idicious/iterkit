[**iterkit**](../README.md)

***

[iterkit](../globals.md) / retry

# Function: retry()

> **retry**\<`T`, `TArgs`\>(`maxRetries`, `delayMs`): [`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

Defined in: [operators.ts:289](https://github.com/Idicious/iterkit/blob/beefb03138960e7ad33cf0e7c7b803de00a0bd5b/src/operators.ts#L289)

Catches errors from the source generator and retries up to maxRetries times with an optional delay.

## Type Parameters

### T

`T`

### TArgs

`TArgs` *extends* `unknown`[] = \[\]

## Parameters

### maxRetries

`number` = `1`

### delayMs

`number` = `0`

## Returns

[`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

An operator function that retries the source generator on error.

## Example

```ts @import.meta.vitest
const { retry } = await import("iterkit");

let attempt = 0;
const source = function* () {
  if (attempt++ < 2) {
    throw Error("Temporary failure");
  }
  yield 1;
}

const result = await Array.fromAsync(retry(2)(source)());
expect(result).toEqual([1]);
```
