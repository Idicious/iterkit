[**iterkit**](../README.md)

***

[iterkit](../globals.md) / withCancellation

# Function: withCancellation()

> **withCancellation**\<`T`, `TArgs`\>(`source`): (`signal`) => [`GenFn`](../type-aliases/GenFn.md)\<`T`, `TArgs`\>

Defined in: [operators.ts:336](https://github.com/Idicious/iterkit/blob/beefb03138960e7ad33cf0e7c7b803de00a0bd5b/src/operators.ts#L336)

Adds cancellation support to the source generator.

## Type Parameters

### T

`T`

### TArgs

`TArgs` *extends* `unknown`[] = \[\]

## Parameters

### source

[`GenFn`](../type-aliases/GenFn.md)\<`T`, `TArgs`\>

## Returns

A function that takes an AbortSignal and returns a cancellable generator.

> (`signal`): [`GenFn`](../type-aliases/GenFn.md)\<`T`, `TArgs`\>

### Parameters

#### signal

`AbortSignal`

### Returns

[`GenFn`](../type-aliases/GenFn.md)\<`T`, `TArgs`\>

## Example

```ts @import.meta.vitest
const { of, delay, withCancellation } = await import("iterkit");

// A delayed source emitting 1..5
const source = delay(5)(of(1, 2, 3, 4, 5));
const cancellable = withCancellation(source);

const controller = new AbortController();
const signal = controller.signal;

const results: number[] = [];
const iterator = cancellable(signal)();

for await (const value of iterator) {
  results.push(value);
  if (value === 3) {
    controller.abort();
  }
}

expect(results).toEqual([1, 2, 3]);
```
