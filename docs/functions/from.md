[**iterkit**](../README.md)

***

[iterkit](../globals.md) / from

# Function: from()

> **from**\<`T`\>(`it`): [`GenFn`](../type-aliases/GenFn.md)\<`T`\>

Defined in: [producers.ts:60](https://github.com/Idicious/iterkit/blob/497a09e986aabb6cdcbc8ad040843aa8c353f93e/src/producers.ts#L60)

Creates a synchronous generator function from an iterable.
Examples of iterables include arrays, sets, and maps.

## Type Parameters

### T

`T`

## Parameters

### it

`Iterable`\<`T`\>

The iterable to convert into a generator.

## Returns

[`GenFn`](../type-aliases/GenFn.md)\<`T`\>

A generator function that yields the values from the iterable.

## Examples

```ts
const { from } = await import("iterkit");

const source = from(new Set([1, 1, 2, 2, 3, 3, 3]));
const result = await Array.fromAsync(source());

expect(result).toEqual([1, 2, 3]);
```

```ts
const { from } = await import("iterkit");

const source = from(new Map([[1, "a"], [2, "b"], [3, "c"]]));
const result = await Array.fromAsync(source());

expect(result).toEqual([[1, "a"], [2, "b"], [3, "c"]]);
```

```ts
const { from } = await import("iterkit");

const source = from([1, 2, 3]);
const result = await Array.fromAsync(source());

expect(result).toEqual([1, 2, 3]);
```
