[**iterkit**](../README.md)

***

[iterkit](../globals.md) / filter

# Function: filter()

> **filter**\<`T`, `TArgs`\>(`predicate`): [`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

Defined in: [operators.ts:71](https://github.com/Idicious/iterkit/blob/beefb03138960e7ad33cf0e7c7b803de00a0bd5b/src/operators.ts#L71)

Filters each item emitted by the source generator using the provided function.

## Type Parameters

### T

`T`

### TArgs

`TArgs` *extends* `unknown`[] = \[\]

## Parameters

### predicate

(`item`, ...`args`) => `boolean` \| `Promise`\<`boolean`\>

The filter function to apply to each item.

## Returns

[`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

An operator function that applies the filter function to each item.

## Example

```ts @import.meta.vitest
const { of, filter } = await import("iterkit");

const source = of(1, 2, 3);
const isOdd = filter((x) => x % 2 === 1);

const result = await Array.fromAsync(isOdd(source)());
expect(result).toEqual([1, 3]);
```
