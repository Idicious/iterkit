[**iterkit**](../README.md)

***

[iterkit](../globals.md) / map

# Function: map()

> **map**\<`T`, `U`, `TArgs`\>(`fn`): [`Operator`](../type-aliases/Operator.md)\<`T`, `Awaited`\<`U`\>, `TArgs`\>

Defined in: [operators.ts:22](https://github.com/Idicious/iterkit/blob/f2299673644b8ee39ca26572a463fe6cf0ddbfba/src/operators.ts#L22)

Maps each item emitted by the source generator using the provided function.

## Type Parameters

### T

`T`

### U

`U`

### TArgs

`TArgs` *extends* `unknown`[] = \[\]

## Parameters

### fn

(`item`, ...`args`) => `U` \| `Promise`\<`U`\>

The mapping function to apply to each item.

## Returns

[`Operator`](../type-aliases/Operator.md)\<`T`, `Awaited`\<`U`\>, `TArgs`\>

An operator function that applies the mapping function to each item.

## Example

```ts @import.meta.vitest
const { of, map } = await import("iterkit");

const source = of(1, 2, 3);
const double = map((x) => x * 2);

const result = await Array.fromAsync(double(source)());
expect(result).toEqual([2, 4, 6]);
```
