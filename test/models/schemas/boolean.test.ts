import f from '../../../src/index'
import SchemaTestUtilities from '../schemaTestUtilities'

describe('Boolean schema', () => {
  const schema = f.Boolean()

  describe('valid booleans', () => {
    test('true', () => expect(schema.validate(true).success).toBe(true))
    test('false', () => expect(schema.validate(false).success).toBe(true))
  })

  describe('invalid value types', () => {
    const invalidTypeValueTests = [
      { title: 'null', value: null },
      { title: 'undefined', value: undefined },
      { title: 'empty string', value: '' },
      { title: 'numeric string', value: '123' },
      { title: 'string', value: 'Hello' },
      { title: 'number', value: 123 },
      { title: 'object', value: {} },
      { title: 'array', value: [] }
    ]

    invalidTypeValueTests.forEach((value) => {
      test(value.title, () => {
        const result = schema.validate(value.value)
        expect(SchemaTestUtilities.checkSchemaResultErrorCodes(result, ['TYPE'])).toBe(true)
      })
    })
  })
})

describe('defaults', () => {
  const schema = f.Boolean().default(true)

  describe('when value is set', () => {
    test('value is returned', () => {
      const result = schema.validate(false)
      expect(result.success).toBe(true)

      if (result.success) expect(result.value).toBe(false)
      else fail('Result was not successful')
    })
  })

  describe('when value is not set', () => {
    test('default value is returned', () => {
      const result = schema.validate(undefined)
      expect(result.success).toBe(true)

      if (result.success) expect(result.value).toBe(true)
      else fail('Result was not successful')
    })
  })
})
