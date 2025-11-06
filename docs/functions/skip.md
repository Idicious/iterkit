[**iterkit**](../README.md)

***

[iterkit](../globals.md) / skip

# Function: skip()

> **skip**\<`T`, `TArgs`\>(`n`): [`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

Defined in: [operators.ts:133](https://github.com/Idicious/iterkit/blob/f2299673644b8ee39ca26572a463fe6cf0ddbfba/src/operators.ts#L133)

Skip the first n items from source generator

## Type Parameters

### T

`T`

### TArgs

`TArgs` *extends* `unknown`[] = \[\]

## Parameters

### n

`number`

Number of items to take.

## Returns

[`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

An operator function that takes the first n items.

## Example

```ts @import.meta.vitest
const { of, skip } = await import("iterkit");

const source = of(1, 2, 3);
const skipOne = skip(1);

const result = await Array.fromAsync(skipOne(source)());
expect(result).toEqual([2, 3]);
```
