[**iterkit**](../README.md)

***

[iterkit](../globals.md) / pipe

# Function: pipe()

## Call Signature

> **pipe**\<`A`, `TArgs`\>(): [`Operator`](../type-aliases/Operator.md)\<`A`, `A`, `TArgs`\>

Defined in: [pipe.ts:21](https://github.com/Idicious/iterkit/blob/f2299673644b8ee39ca26572a463fe6cf0ddbfba/src/pipe.ts#L21)

Composes multiple operators into a single operator.

### Type Parameters

#### A

`A`

#### TArgs

`TArgs` *extends* `unknown`[] = \[\]

### Returns

[`Operator`](../type-aliases/Operator.md)\<`A`, `A`, `TArgs`\>

### Example

```ts @import.meta.vitest
const { of, pipe, map, filter } = await import("iterkit");

const transform = pipe(
  map((x) => x * 2),
  filter((x) => x > 5)
);

const source = of(1, 2, 3, 4);
const result = await Array.fromAsync(transform(source)());

expect(result).toEqual([6, 8]);
```

## Call Signature

> **pipe**\<`A`, `R`, `TArgs`\>(`operator1`): [`Operator`](../type-aliases/Operator.md)\<`A`, `R`, `TArgs`\>

Defined in: [pipe.ts:22](https://github.com/Idicious/iterkit/blob/f2299673644b8ee39ca26572a463fe6cf0ddbfba/src/pipe.ts#L22)

Composes multiple operators into a single operator.

### Type Parameters

#### A

`A`

#### R

`R`

#### TArgs

`TArgs` *extends* `unknown`[] = \[\]

### Parameters

#### operator1

[`Operator`](../type-aliases/Operator.md)\<`A`, `R`, `TArgs`\>

### Returns

[`Operator`](../type-aliases/Operator.md)\<`A`, `R`, `TArgs`\>

### Example

```ts @import.meta.vitest
const { of, pipe, map, filter } = await import("iterkit");

const transform = pipe(
  map((x) => x * 2),
  filter((x) => x > 5)
);

const source = of(1, 2, 3, 4);
const result = await Array.fromAsync(transform(source)());

expect(result).toEqual([6, 8]);
```

## Call Signature

> **pipe**\<`A`, `B`, `R`, `TArgs`\>(`operator1`, `operator2`): [`Operator`](../type-aliases/Operator.md)\<`A`, `R`, `TArgs`\>

Defined in: [pipe.ts:25](https://github.com/Idicious/iterkit/blob/f2299673644b8ee39ca26572a463fe6cf0ddbfba/src/pipe.ts#L25)

Composes multiple operators into a single operator.

### Type Parameters

#### A

`A`

#### B

`B`

#### R

`R`

#### TArgs

`TArgs` *extends* `unknown`[] = \[\]

### Parameters

#### operator1

[`Operator`](../type-aliases/Operator.md)\<`A`, `B`, `TArgs`\>

#### operator2

[`Operator`](../type-aliases/Operator.md)\<`B`, `R`, `TArgs`\>

### Returns

[`Operator`](../type-aliases/Operator.md)\<`A`, `R`, `TArgs`\>

### Example

```ts @import.meta.vitest
const { of, pipe, map, filter } = await import("iterkit");

const transform = pipe(
  map((x) => x * 2),
  filter((x) => x > 5)
);

const source = of(1, 2, 3, 4);
const result = await Array.fromAsync(transform(source)());

expect(result).toEqual([6, 8]);
```

## Call Signature

> **pipe**\<`A`, `B`, `C`, `R`, `TArgs`\>(`operator1`, `operator2`, `operator3`): [`Operator`](../type-aliases/Operator.md)\<`A`, `R`, `TArgs`\>

Defined in: [pipe.ts:29](https://github.com/Idicious/iterkit/blob/f2299673644b8ee39ca26572a463fe6cf0ddbfba/src/pipe.ts#L29)

Composes multiple operators into a single operator.

### Type Parameters

#### A

`A`

#### B

`B`

#### C

`C`

#### R

`R`

#### TArgs

`TArgs` *extends* `unknown`[] = \[\]

### Parameters

#### operator1

[`Operator`](../type-aliases/Operator.md)\<`A`, `B`, `TArgs`\>

#### operator2

[`Operator`](../type-aliases/Operator.md)\<`B`, `C`, `TArgs`\>

#### operator3

[`Operator`](../type-aliases/Operator.md)\<`C`, `R`, `TArgs`\>

### Returns

[`Operator`](../type-aliases/Operator.md)\<`A`, `R`, `TArgs`\>

### Example

```ts @import.meta.vitest
const { of, pipe, map, filter } = await import("iterkit");

const transform = pipe(
  map((x) => x * 2),
  filter((x) => x > 5)
);

const source = of(1, 2, 3, 4);
const result = await Array.fromAsync(transform(source)());

expect(result).toEqual([6, 8]);
```

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `R`, `TArgs`\>(`operator1`, `operator2`, `operator3`, `operator4`): [`Operator`](../type-aliases/Operator.md)\<`A`, `R`, `TArgs`\>

Defined in: [pipe.ts:34](https://github.com/Idicious/iterkit/blob/f2299673644b8ee39ca26572a463fe6cf0ddbfba/src/pipe.ts#L34)

Composes multiple operators into a single operator.

### Type Parameters

#### A

`A`

#### B

`B`

#### C

`C`

#### D

`D`

#### R

`R`

#### TArgs

`TArgs` *extends* `unknown`[] = \[\]

### Parameters

#### operator1

[`Operator`](../type-aliases/Operator.md)\<`A`, `B`, `TArgs`\>

#### operator2

[`Operator`](../type-aliases/Operator.md)\<`B`, `C`, `TArgs`\>

#### operator3

[`Operator`](../type-aliases/Operator.md)\<`C`, `D`, `TArgs`\>

#### operator4

[`Operator`](../type-aliases/Operator.md)\<`D`, `R`, `TArgs`\>

### Returns

[`Operator`](../type-aliases/Operator.md)\<`A`, `R`, `TArgs`\>

### Example

```ts @import.meta.vitest
const { of, pipe, map, filter } = await import("iterkit");

const transform = pipe(
  map((x) => x * 2),
  filter((x) => x > 5)
);

const source = of(1, 2, 3, 4);
const result = await Array.fromAsync(transform(source)());

expect(result).toEqual([6, 8]);
```

## Call Signature

> **pipe**\<`A`, `B`, `C`, `D`, `E`, `R`, `TArgs`\>(`operator1`, `operator2`, `operator3`, `operator4`, `operator5`): [`Operator`](../type-aliases/Operator.md)\<`A`, `R`, `TArgs`\>

Defined in: [pipe.ts:40](https://github.com/Idicious/iterkit/blob/f2299673644b8ee39ca26572a463fe6cf0ddbfba/src/pipe.ts#L40)

Composes multiple operators into a single operator.

### Type Parameters

#### A

`A`

#### B

`B`

#### C

`C`

#### D

`D`

#### E

`E`

#### R

`R`

#### TArgs

`TArgs` *extends* `unknown`[] = \[\]

### Parameters

#### operator1

[`Operator`](../type-aliases/Operator.md)\<`A`, `B`, `TArgs`\>

#### operator2

[`Operator`](../type-aliases/Operator.md)\<`B`, `C`, `TArgs`\>

#### operator3

[`Operator`](../type-aliases/Operator.md)\<`C`, `D`, `TArgs`\>

#### operator4

[`Operator`](../type-aliases/Operator.md)\<`D`, `E`, `TArgs`\>

#### operator5

[`Operator`](../type-aliases/Operator.md)\<`E`, `R`, `TArgs`\>

### Returns

[`Operator`](../type-aliases/Operator.md)\<`A`, `R`, `TArgs`\>

### Example

```ts @import.meta.vitest
const { of, pipe, map, filter } = await import("iterkit");

const transform = pipe(
  map((x) => x * 2),
  filter((x) => x > 5)
);

const source = of(1, 2, 3, 4);
const result = await Array.fromAsync(transform(source)());

expect(result).toEqual([6, 8]);
```
