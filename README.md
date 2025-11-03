# iterkit

### Overview

`iterkit` is a lightweight TypeScript library for composing and transforming synchronous and asynchronous generator functions using a functional operator pattern.  
It provides a unified, declarative way to build streaming data pipelines that work seamlessly with both sync and async sources — without requiring a separate abstraction like Observables.

---

### Features

- 🌀 **Composable async pipelines** — build readable, lazy-evaluated streams.
- ⚡ **Unified sync/async interop** — `for await...of` just works everywhere.
- 🧩 **Functional operator pattern** — inspired by RxJS but simpler.
- 🧠 **Strong type inference** — generics propagate cleanly through operators.
- 🪶 **Zero dependencies** — minimal footprint, pure TypeScript.

---

### Installation

```bash
npm install iterkit
```

---

### Quick Example

```ts
import { of, pipe, map, filter } from "iterkit";

const numbers = of(1, 2, 3, 4, 5);

const doubleEvens = pipe(
  filter((x) => x % 2 === 0),
  map((x) => x * 2)
);

const result = await Array.fromAsync(doubleEvens(numbers)());
console.log(result); // [4, 8]
```

---

### Core Concepts

#### `GenFn`

A `GenFn` is a function that returns an `Iterable` or `AsyncIterable`:

```ts
type GenFn<T, TArgs extends unknown[]> = (
  ...args: TArgs
) => Iterable<T> | AsyncIterable<T>;
```

#### `Operator`

An `Operator` transforms one generator function into another:

```ts
type Operator<TIn, TOut, TArgs extends unknown[]> = (
  source: GenFn<TIn, any[]>
) => GenFn<TOut, TArgs>;
```

Operators can be composed using `pipe`, which applies them left-to-right.

#### `pipe`

The `pipe` function composes operators to form a reusable transformation:

```ts
const transform = pipe(
  map((x) => x * 2),
  filter((x) => x > 5)
);
const run = transform(of(1, 2, 3, 4));
```

---

### License

MIT
