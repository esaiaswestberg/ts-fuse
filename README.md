# TS-Fuse

## Description
TS-Fuse is a library to help developers ensure type safety in their runtime environment. It allows you to make sure a variable has the type and/or structure you expect it to have.

## Documentation

### Schema Validation
```typescript
import f from 'ts-fuse'

/* A schema can be used to validate a variable. */
const stringSchema = f.String()

const stringValue = 'Hello World!'
const stringResult = stringSchema.validate(stringValue) // Returns { value: 'Hello World!', success: true, error: null }

const numberValue = 5
const numberResult = stringSchema.validate(numberValue) // Returns { value: 5, success: false, error: 'Expected a string, got a number.' }

/* Object schemas show a bit more information on error. */
const objectSchema = f.Object({
  name: f.String(),
  age: f.Number()
})

const objectValue = {
  name: 'John Doe',
  age: '25'
}

const objectResult = objectSchema.validate(objectValue)
/*
  Returns: 
  {
    value: { name: 'John Doe', age: '25' },
    success: false,
    error: {
      name: { value: 'John Doe', success: true, error: null },
      age: { value: '25', success: false, error: 'Expected a number, got a string.' }
    }
  }
```

### Schema Types

#### Global
```typescript
import f from 'ts-fuse'

/* On any schema a default value can be set. This is returned as a value if the value does not fulfill the requirements. */
const defaultStringSchema = f.String().default('default value')
const defaultNumberSchema = f.Number().default(0)

/* A schema can also be optional. This means that the value is allowed to be undefined. */
const optionalStringSchema = f.String().optional()
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

/* A string schema can also be used to ensure the string is a certain type. */
const emailSchema = f.String().email() // Ensures the string is a valid email address.
const urlSchema = f.String().url() // Ensures the string is a valid URL.
const ipv4Schema = f.String().ipv4() // Ensures the string is a valid IPv4 address.
const uuidSchema = f.String().uuid() // Ensures the string is a valid UUID.
const alphanumericSchema = f.String().alphanumeric() // Ensures the string is alphanumeric.
const numericSchema = f.String().numeric() // Ensures the string is numeric.
const jsonSchema = f.String().json() // Ensures the string is a valid JSON string.
```

#### Number
```typescript
import f from 'ts-fuse'

/* A standard Number schema will let you ensure the variable is a number. */
const numberSchema = f.Number()

/* A number schema can ensure the value is either an Integer or a Floating Point number. */
const integerSchema = f.Number().int()
const floatSchema = f.Number().float()

/* A number schema can also be used to ensure the number has a minimum and maximum value. */
const minSchema = f.Number().min(5) // Ensures the number is at least 5.
const maxSchema = f.Number().max(5) // Ensures the number is at most 5.

/* A number schema can also be used to ensure the number is a certain type. */
const positiveSchema = f.Number().positive() // Ensures the number is positive.
const negativeSchema = f.Number().negative() // Ensures the number is negative.

/* A number schema can also be used to ensure the number is a certain type. */
const evenSchema = f.Number().even() // Ensures the number is even.
const oddSchema = f.Number().odd() // Ensures the number is odd.
```

#### Boolean
```typescript
import f from 'ts-fuse'

/* A standard Boolean schema will let you ensure the variable is a boolean. */
const booleanSchema = f.Boolean()
```

#### Array
```typescript
import f from 'ts-fuse'

/* A standard Array schema will let you ensure the variable is an array. */
const arraySchema = f.Array()

/* Am array schema can also be used to ensure it only contains one type of element. */
const stringArraySchema = f.Array().of(f.String())

/* An array schema can also be used to ensure the array has a minimum and maximum length. */
const minSchema = f.Array().minLength(5) // Ensures the array has at least 5 items.
const maxSchema = f.Array().maxLength(5) // Ensures the array has at most 5 items.

/* An array schema can also be used to ensure the array has a certain length. */
const lengthSchema = f.Array().length(5) // Ensures the array has exactly 5 items.
```

#### Object
```typescript
import f from 'ts-fuse'

/* A standard Object schema will let you ensure the variable is an object. */
const objectSchema = f.Object()

/* An object schema can also be used to ensure it has a certain structure. */
const structureSchema = f.Object({
  name: f.String(),
  age: f.Number(),
  items: f.Array().of(f.Object({
    name: f.String(),
    price: f.Number()
  }))
})

/* An object can be allowed to have more than the specified keys. */
const partialStructureSchema = f.Object({
  name: f.String(),
  age: f.Number()
}).expandable()
```