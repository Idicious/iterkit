[**iterkit**](../README.md)

***

[iterkit](../globals.md) / of

# Function: of()

> **of**\<`T`\>(...`values`): [`GenFn`](../type-aliases/GenFn.md)\<`T`\>

Defined in: [producers.ts:19](https://github.com/Idicious/iterkit/blob/f2299673644b8ee39ca26572a463fe6cf0ddbfba/src/producers.ts#L19)

Creates a synchronous generator function from a list of values.

## Type Parameters

### T

`T`

## Parameters

### values

...`T`[]

The values to include in the generator.

## Returns

[`GenFn`](../type-aliases/GenFn.md)\<`T`\>

A generator function that yields the provided values.

## Example

```ts @import.meta.vitest
const { of } = await import("iterkit");

const source = of(1, 2, 3);
const result = await Array.fromAsync(source());

expect(result).toEqual([1, 2, 3]);
```
