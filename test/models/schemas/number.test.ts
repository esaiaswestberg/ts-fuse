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
