[**iterkit**](../README.md)

***

[iterkit](../globals.md) / take

# Function: take()

> **take**\<`T`, `TArgs`\>(`n`): [`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

Defined in: [operators.ts:102](https://github.com/Idicious/iterkit/blob/497a09e986aabb6cdcbc8ad040843aa8c353f93e/src/operators.ts#L102)

Takes the first n items from source generator

## Type Parameters

### T

`T`

### TArgs

`TArgs` *extends* `unknown`[] = \[\]

## Parameters

### n

`number`

Number of items to take.

## Returns

[`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

An operator function that takes the first n items.

## Example

```ts
const { of, take } = await import("iterkit");

const source = of(1, 2, 3);
const takeTwo = take(2);

const result = await Array.fromAsync(takeTwo(source)());
expect(result).toEqual([1, 2]);
```
