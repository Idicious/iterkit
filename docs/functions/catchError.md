[**iterkit**](../README.md)

***

[iterkit](../globals.md) / catchError

# Function: catchError()

> **catchError**\<`T`, `TArgs`\>(`onError`): [`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

Defined in: [operators.ts:221](https://github.com/Idicious/iterkit/blob/f2299673644b8ee39ca26572a463fe6cf0ddbfba/src/operators.ts#L221)

Catches errors from the source generator and switches to a backup generator.

## Type Parameters

### T

`T`

### TArgs

`TArgs` *extends* `unknown`[] = \[\]

## Parameters

### onError

(`error`, ...`args`) => [`GenFn`](../type-aliases/GenFn.md)\<`T`, `TArgs`\>

Function that returns a backup generator when an error occurs.

## Returns

[`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

An operator function that catches errors and switches to the backup generator.

## Example

```ts @import.meta.vitest
const { of, throwError, catchError } = await import("iterkit");

const source = throwError(new Error("Oops"));
const catcher = catchError(() => of(1, 2, 3));

const result = await Array.fromAsync(catcher(source)());
expect(result).toEqual([1, 2, 3]);
```
