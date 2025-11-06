[**iterkit**](../README.md)

***

[iterkit](../globals.md) / catchErrorDefault

# Function: catchErrorDefault()

> **catchErrorDefault**\<`T`, `TArgs`\>(`defaultValue`): [`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

Defined in: [operators.ts:257](https://github.com/Idicious/iterkit/blob/beefb03138960e7ad33cf0e7c7b803de00a0bd5b/src/operators.ts#L257)

Catches errors from the source generator and returns a default value.

## Type Parameters

### T

`T`

### TArgs

`TArgs` *extends* `unknown`[] = \[\]

## Parameters

### defaultValue

(`error`, ...`args`) => `T`

## Returns

[`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

An operator function that catches errors and returns a default value.

## Example

```ts @import.meta.vitest
const { of, throwError, catchErrorDefault } = await import("iterkit");

const source = throwError(new Error("Oops"));
const catcher = catchErrorDefault(() => 42);

const result = await Array.fromAsync(catcher(source)());
expect(result).toEqual([42]);
```
