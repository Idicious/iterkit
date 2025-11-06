[**iterkit**](../README.md)

***

[iterkit](../globals.md) / merge

# Function: merge()

> **merge**\<`T`\>(...`generators`): [`GenFn`](../type-aliases/GenFn.md)\<`T` *extends* readonly [`GenFn`](../type-aliases/GenFn.md)\<`U`\>[] ? `Awaited`\<`U`\> : `never`\>

Defined in: [producers.ts:125](https://github.com/Idicious/iterkit/blob/f2299673644b8ee39ca26572a463fe6cf0ddbfba/src/producers.ts#L125)

Merges multiple generator functions into a single generator function.

## Type Parameters

### T

`T` *extends* readonly [`GenFn`](../type-aliases/GenFn.md)\<`any`\>[]

## Parameters

### generators

...`T`

The generator functions to merge.

## Returns

[`GenFn`](../type-aliases/GenFn.md)\<`T` *extends* readonly [`GenFn`](../type-aliases/GenFn.md)\<`U`\>[] ? `Awaited`\<`U`\> : `never`\>

A generator function that yields values from all provided generators.

## Example

```ts @import.meta.vitest
const { merge, of } = await import("iterkit");

const source1 = of(1, 2, 3);
const source2 = of(4, 5, 6);
const merged = merge(source1, source2);

const result = await Array.fromAsync(merged());

expect(result).toEqual([1, 2, 3, 4, 5, 6]);
```
