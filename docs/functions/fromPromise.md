[**iterkit**](../README.md)

***

[iterkit](../globals.md) / fromPromise

# Function: fromPromise()

> **fromPromise**\<`T`\>(`it`): [`GenFn`](../type-aliases/GenFn.md)\<`T`\>

Defined in: [producers.ts:80](https://github.com/Idicious/iterkit/blob/497a09e986aabb6cdcbc8ad040843aa8c353f93e/src/producers.ts#L80)

Creates an async generator function from a promise.

## Type Parameters

### T

`T`

## Parameters

### it

`Promise`\<`T`\>

The promise to convert into a generator.

## Returns

[`GenFn`](../type-aliases/GenFn.md)\<`T`\>

A generator function that yields the resolved value of the promise.

## Example

```ts
const { fromPromise } = await import("iterkit");

const source = fromPromise(Promise.resolve(42));
const result = await Array.fromAsync(source());

expect(result).toEqual([42]);
```
