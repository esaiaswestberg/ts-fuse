# TS-Fuse

[![npm version](https://img.shields.io/npm/v/ts-fuse.svg)](https://www.npmjs.com/package/ts-fuse)
[![Downloads](https://img.shields.io/npm/dm/ts-fuse.svg)](https://www.npmjs.com/package/ts-fuse)
[![GitHub](https://img.shields.io/github/license/esaiaswestberg/ts-fuse)](https://www.github.com/esaiaswestberg/ts-fuse)

[Getting started](#getting-started) | [Documentation](#documentation) | [Contributing](/CONTRIBUTING.md) | [License](/LICENSE)

## Getting started

TS-Fuse allows you to validate user input. Currently we support validating `String`, `Number` & `Boolean` variables. To get started install `ts-fuse` like this:

### Installation

#### NPM

`npm i ts-fuse`

#### PNPM

`pnpm i ts-fuse`

### Importing

#### TypeScript

```typescript
import f from 'ts-fuse'
```

#### JavaScript

```javascript
import f from 'ts-fuse'
```

_Importing in JS is currently a bit weird, but the issue is known and the progress can be followed on [this issue](https://github.com/esaiaswestberg/ts-fuse/issues/11)._

### Create your first schema

```typescript
import f from 'ts-fuse'

const stringSchema = f.String()

const value = 'This is your user input!'
const { success } = stringSchema.validate(value)

console.log(`Validation ${success ? 'was successful' : 'failed'}!`)
```

When you need more advanced validation, go and look at [Documentation](#documentation).

## Documentation

### Schema Validation

```typescript
import f from 'ts-fuse'

// A schema can be used to validate a variable.
const stringSchema = f.String()

const stringValue = 'Hello World!'
const stringResult = stringSchema.validate(stringValue)
// Returns:
// {
//   success: true,
//   value: 'Hello World!'
// }

const numberValue = 5
const numberResult = stringSchema.validate(numberValue)
// Returns:
// {
//   success: false,
//   errors: [
//     {
//       code: 'type',
//       message: 'Value is not a valid string.',
//     }
//   ]
// }
```

### Schema Types

#### Global

```typescript
import f from 'ts-fuse'

/* On any schema a default value can be set. This is returned as a value if the value is undefined or null. */
const defaultStringSchema = f.String().default('default value')
const defaultNumberSchema = f.Number().default(0)
```

#### String

```typescript
import f from 'ts-fuse'

/* A standard String schema will let you ensure the variable is a string. */
const stringSchema = f.String()

/* A string schema can also be used to ensure the string is a certain length. */
const lengthSchema = f.String().length(5) // Ensures the string is exactly 5 characters long.
const minLengthSchema = f.String().minLength(5) // Ensures the string is at least 5 characters long.
const maxLengthSchema = f.String().maxLength(5) // Ensures the string is at most 5 characters long.

/* A string schema can also be used to ensure the string matches a certain pattern. */
const regexSchema = f.String().regex(/^[a-z]+$/)
```

#### Number

```typescript
import f from 'ts-fuse'

/* A standard Number schema will let you ensure the variable is a number. */
const numberSchema = f.Number()

/* A number schema can ensure the value is an Integer. */
const integerSchema = f.Number().int()

/* A number schema can also be used to ensure the number has a minimum and maximum value. */
const minSchema = f.Number().min(5) // Ensures the number is at least 5.
const maxSchema = f.Number().max(5) // Ensures the number is at most 5.

/* A number schema can also be used to ensure the number is a certain type. */
const positiveSchema = f.Number().positive() // Ensures the number is positive.
const negativeSchema = f.Number().negative() // Ensures the number is negative.

/* A number schema can also be used to ensure the integer has a certain parity. */
/* Disclaimer: This requires the schema to have an integer check first! */
const evenSchema = f.Number().even() // Ensures the number is even.
const oddSchema = f.Number().odd() // Ensures the number is odd.
```

#### Boolean

```typescript
import f from 'ts-fuse'

/* A standard Boolean schema will let you ensure the variable is a boolean. */
const booleanSchema = f.Boolean()
```
