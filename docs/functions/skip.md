[**iterkit**](../README.md)

***

[iterkit](../globals.md) / skip

# Function: skip()

> **skip**\<`T`, `TArgs`\>(`n`): [`Operator`](../type-aliases/Operator.md)\<`T`, `T`, `TArgs`\>

Defined in: [operators.ts:133](https://github.com/Idicious/iterkit/blob/497a09e986aabb6cdcbc8ad040843aa8c353f93e/src/operators.ts#L133)

Skip the first n items from source generator

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
const { of, skip } = await import("iterkit");

const source = of(1, 2, 3);
const skipOne = skip(1);

const result = await Array.fromAsync(skipOne(source)());
expect(result).toEqual([2, 3]);
```
