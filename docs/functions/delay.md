[**iterkit**](../README.md)

***

[iterkit](../globals.md) / delay

# Function: delay()

> **delay**\<`T`, `TArgs`\>(`ms`): [`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

Defined in: [operators.ts:164](https://github.com/Idicious/iterkit/blob/497a09e986aabb6cdcbc8ad040843aa8c353f93e/src/operators.ts#L164)

Delay emission of each item by ms

## Type Parameters

### T

`T`

### TArgs

`TArgs` *extends* `unknown`[] = \[\]

## Parameters

### ms

`number`

Number of milliseconds to delay each item.

## Returns

[`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

An operator function that delays the emission of each item by the specified milliseconds.

## Example

```ts
const { of, delay } = await import("iterkit");

const source = of(1, 2, 3);
const delay10Ms = delay(10);

const result = await Array.fromAsync(delay10Ms(source)());
expect(result).toEqual([1, 2, 3]);
```
