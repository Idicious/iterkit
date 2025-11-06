[**iterkit**](../README.md)

***

[iterkit](../globals.md) / concatMap

# Function: concatMap()

> **concatMap**\<`T`, `U`, `TArgs`\>(`fn`): [`Operator`](../type-aliases/Operator.md)\<`T`, `U`, `TArgs`\>

Defined in: [operators.ts:192](https://github.com/Idicious/iterkit/blob/f2299673644b8ee39ca26572a463fe6cf0ddbfba/src/operators.ts#L192)

Maps each item emitted by the source generator to an inner generator and flattens the results.

## Type Parameters

### T

`T`

### U

`U`

### TArgs

`TArgs` *extends* `unknown`[] = \[\]

## Parameters

### fn

(`item`, ...`args`) => [`GenFn`](../type-aliases/GenFn.md)\<`U`, `TArgs`\>

The function that maps each item to an inner generator.

## Returns

[`Operator`](../type-aliases/Operator.md)\<`T`, `U`, `TArgs`\>

An operator function that flattens the inner generators.

## Example

```ts @import.meta.vitest
const { of, concatMap } = await import("iterkit");

const source = of(1, 2);
const expand = concatMap((x) => of(1 * x, 2 * x, 3 * x));

const result = await Array.fromAsync(expand(source)());
expect(result).toEqual([1, 2, 3, 2, 4, 6]);
```
