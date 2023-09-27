import f from '../../../src/index'
import SchemaTestUtilities from '../schemaTestUtilities'

describe('String schema', () => {
  const schema = new f.String()

  describe('valid strings', () => {
    test('filled string', () => expect(schema.validate('Hello').success).toBe(true))
    test('emoji string', () => expect(schema.validate('😋📙').success).toBe(true))
    test('empty string', () => expect(schema.validate('').success).toBe(true))
  })

  describe('non string values', () => {
    test('empty object', () => {
      const result = schema.validate({})
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
    })

    test('object with data', () => {
      const result = schema.validate({ data: 'Hello' })
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
    })

    test('integer', () => {
      const result = schema.validate(123)
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
    })

    test('float', () => {
      const result = schema.validate(123.456)
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
    })

    test('undefined', () => {
      const result = schema.validate(undefined)
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
    })

    test('null', () => {
      const result = schema.validate(null)
      expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
    })
  })
})

describe('exact length string requirement', () => {
  const schema = new f.String().length(10)

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
