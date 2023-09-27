import f from '../../../src/index'
import SchemaTestUtilities from '../schemaTestUtilities'

describe('String schema', () => {
  const schema = f.String()

  describe('valid strings', () => {
    test('filled string', () => expect(schema.validate('Hello').success).toBe(true))
    test('emoji string', () => expect(schema.validate('😋📙').success).toBe(true))
    test('empty string', () => expect(schema.validate('').success).toBe(true))
  })

  describe('non string values', () => {
    const invalidTypeValueTests = [
      { title: 'empty object', value: {} },
      { title: 'object with data', value: { data: 'Hello' } },
      { title: 'integer', value: 123 },
      { title: 'float', value: 123.456 },
      { title: 'undefined', value: undefined },
      { title: 'null', value: null }
    ]

    invalidTypeValueTests.forEach((value) => {
      test(value.title, () => {
        const result = schema.validate(value.value)
        expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
      })
    })
  })
})

describe('exact length string requirement', () => {
  const schema = f.String().length(10)

  describe('correct length strings', () => {
    test('hello', () => expect(schema.validate('HelloWorld').success).toBe(true))
    test('emoji string', () => expect(schema.validate('😋📙😋📙📙').success).toBe(true))
  })

  describe('invalid string lengths', () => {
    test('empty string', () => {
      const result = schema.validate('')
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['LENGTH'])).toBe(true)
    })

    test('long string', () => {
      const result = schema.validate('HelloWorldHelloWorld')
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['LENGTH'])).toBe(true)
    })
  })
})
