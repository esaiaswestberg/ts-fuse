import f from '../../../src/index'
import SchemaTestUtilities from '../schemaTestUtilities'

describe('Number schema', () => {
  const schema = new f.Number()

  describe('valid numbers', () => {
    test('one', () => expect(schema.validate(1).success).toBe(true))
    test('zero', () => expect(schema.validate(0).success).toBe(true))
    test('negative one', () => expect(schema.validate(-1).success).toBe(true))

    test('square root of two', () => expect(schema.validate(Math.sqrt(2)).success).toBe(true))
    test('pi', () => expect(schema.validate(Math.PI).success).toBe(true))
    test('eulers number', () => expect(schema.validate(Math.E).success).toBe(true))
  })

  describe('invalid values', () => {
    test('NaN', () => {
      const result = schema.validate(NaN)
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
    })

    test('string', () => {
      const result = schema.validate('Hello')
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
    })

    test('numeric string', () => {
      const result = schema.validate('123')
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
    })

    test('null', () => {
      const result = schema.validate(null)
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
    })

    test('undefined', () => {
      const result = schema.validate(undefined)
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
    })
  })
})

describe('Integer number schema', () => {
  const schema = new f.Number().int()

  describe('valid integers', () => {
    test('one', () => expect(schema.validate(1).success).toBe(true))
    test('zero', () => expect(schema.validate(0).success).toBe(true))
    test('negative one', () => expect(schema.validate(-1).success).toBe(true))
    test('biggest int', () => expect(schema.validate(parseFloat('1E308')).success).toBe(true))
    test('smallest int', () => expect(schema.validate(parseFloat('-1E308')).success).toBe(true))
  })

  describe('floating point numbers', () => {
    test('square root of two', () => {
      const results = schema.validate(Math.sqrt(2))
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(results, ['PATTERN'])).toBe(true)
    })

    test('pi', () => {
      const results = schema.validate(Math.PI)
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(results, ['PATTERN'])).toBe(true)
    })

    test('eulers number', () => {
      const results = schema.validate(Math.E)
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(results, ['PATTERN'])).toBe(true)
    })

    test('1E-323', () => {
      const results = schema.validate(parseFloat('1E-323'))
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(results, ['PATTERN'])).toBe(true)
    })
  })
})
