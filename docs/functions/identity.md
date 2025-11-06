[**iterkit**](../README.md)

***

[iterkit](../globals.md) / identity

# Function: identity()

> **identity**\<`T`, `TArgs`\>(): [`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

Defined in: [operators.ts:50](https://github.com/Idicious/iterkit/blob/beefb03138960e7ad33cf0e7c7b803de00a0bd5b/src/operators.ts#L50)

Returns the source generator

## Type Parameters

### T

`T`

### TArgs

`TArgs` *extends* `unknown`[] = \[\]

## Returns

[`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

An operator function that returns the source generator.

## Example

```ts @import.meta.vitest
const { of, identity } = await import("iterkit");

const source = of(1, 2, 3);
const ident = identity();

const result = await Array.fromAsync(ident(source)());
expect(result).toEqual([1, 2, 3]);
```
