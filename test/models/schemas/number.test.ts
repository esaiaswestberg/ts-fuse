import f from '../../../src/index'
import SchemaTestUtilities from '../schemaTestUtilities'

describe('Number schema', () => {
  const schema = f.Number()

  describe('valid numbers', () => {
    test('one', () => expect(schema.validate(1).success).toBe(true))
    test('zero', () => expect(schema.validate(0).success).toBe(true))
    test('negative one', () => expect(schema.validate(-1).success).toBe(true))

    test('square root of two', () => expect(schema.validate(Math.sqrt(2)).success).toBe(true))
    test('pi', () => expect(schema.validate(Math.PI).success).toBe(true))
    test('eulers number', () => expect(schema.validate(Math.E).success).toBe(true))
  })

  describe('invalid values', () => {
    const invalidTypeValueTests = [
      { title: 'NaN', value: NaN },
      { title: 'string', value: 'Hello' },
      { title: 'numeric string', value: '123' },
      { title: 'null', value: null },
      { title: 'undefined', value: undefined }
    ]

    invalidTypeValueTests.forEach((value) => {
      test(value.title, () => {
        const result = schema.validate(value.value)
        expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
      })
    })
  })
})

describe('Integer number schema', () => {
  const schema = f.Number().int()

  describe('valid integers', () => {
    test('one', () => expect(schema.validate(1).success).toBe(true))
    test('zero', () => expect(schema.validate(0).success).toBe(true))
    test('negative one', () => expect(schema.validate(-1).success).toBe(true))
    test('biggest int', () => expect(schema.validate(parseFloat('1E308')).success).toBe(true))
    test('smallest int', () => expect(schema.validate(parseFloat('-1E308')).success).toBe(true))
  })

  describe('floating point numbers', () => {
    const invalidIntegerValueTests = [
      { title: 'square root of two', value: Math.sqrt(2) },
      { title: 'pi', value: Math.PI },
      { title: 'eulers number', value: Math.E },
      { title: '1E-323', value: parseFloat('1E-323') }
    ]

    invalidIntegerValueTests.forEach((value) => {
      test(value.title, () => {
        const result = schema.validate(value.value)
        expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['PATTERN'])).toBe(true)
      })
    })
  })
})

describe('defaults', () => {
  const schema = f.Number().default(32)

  describe('when value is set', () => {
    test('value is returned', () => {
      const result = schema.validate(64)
      expect(result.success).toBe(true)

      if (result.success) expect(result.value).toBe(64)
      else fail('Result was not successful')
    })
  })

  describe('when value is not set', () => {
    test('default value is returned', () => {
      const result = schema.validate(undefined)
      expect(result.success).toBe(true)

      if (result.success) expect(result.value).toBe(32)
      else fail('Result was not successful')
    })
  })
})

describe('positive numbers', () => {
  const schema = f.Number().positive()

  describe('valid positive numbers', () => {
    test('one', () => expect(schema.validate(1).success).toBe(true))
    test('biggest positive number', () => expect(schema.validate(parseFloat('1E308')).success).toBe(true))
  })

  describe('invalid positive numbers', () => {
    const invalidPositiveNumberTests = [
      { title: 'negative one', value: -1 },
      { title: 'biggest negative number', value: parseFloat('-1E308') }
    ]

    invalidPositiveNumberTests.forEach((value) => {
      test(value.title, () => {
        const result = schema.validate(value.value)
        expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['SIZE'])).toBe(true)
      })
    })
  })
})

describe('negative numbers', () => {
  const schema = f.Number().negative()

  describe('valid negative numbers', () => {
    test('negative one', () => expect(schema.validate(-1).success).toBe(true))
    test('biggest negative number', () => expect(schema.validate(parseFloat('-1E308')).success).toBe(true))
  })

  describe('invalid negative numbers', () => {
    const invalidNegativeNumberTests = [
      { title: 'one', value: 1 },
      { title: 'biggest positive number', value: parseFloat('1E308') }
    ]

    invalidNegativeNumberTests.forEach((value) => {
      test(value.title, () => {
        const result = schema.validate(value.value)
        expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['SIZE'])).toBe(true)
      })
    })
  })
})

describe('number even parity', () => {
  const schema = f.Number().int().even()

  describe('valid even numbers', () => {
    test('two', () => expect(schema.validate(2).success).toBe(true))
  })

  describe('invalid even numbers', () => {
    test('one', () => {
      const result = schema.validate(1)
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['SIZE'])).toBe(true)
    })
  })
})

describe('number odd parity', () => {
  const schema = f.Number().int().odd()

  describe('valid odd numbers', () => {
    test('one', () => expect(schema.validate(1).success).toBe(true))
  })

  describe('invalid odd numbers', () => {
    test('two', () => {
      const result = schema.validate(2)
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['SIZE'])).toBe(true)
    })
  })
})
