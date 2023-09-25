import f from '../../../src/index'
import type ValidationResult from '../../../src/types/ValidationResult'

describe('plain string requirement', () => {
  const schema = new f.String()

  describe('valid strings', () => {
    test('filled string', () => expect(schema.validate('Hello').success).toBe(true))
    test('emoji string', () => expect(schema.validate('😋📙').success).toBe(true))
    test('empty string', () => expect(schema.validate('').success).toBe(true))
  })

  describe('non string values', () => {
    const expectedResult: ValidationResult<string> = {
      success: false,
      errors: [
        {
          code: 'type',
          message: 'Value is not a valid string.',
          path: []
        }
      ]
    }

    test('empty object', () => expect(schema.validate({})).toMatchObject(expectedResult))
    test('object with data', () => expect(schema.validate({ string: 'nothing' })).toMatchObject(expectedResult))

    test('integer', () => expect(schema.validate(123456)).toMatchObject(expectedResult))
    test('float', () => expect(schema.validate(123.456)).toMatchObject(expectedResult))

    test('undefined', () => expect(schema.validate(undefined)).toMatchObject(expectedResult))
    test('null', () => expect(schema.validate(null)).toMatchObject(expectedResult))
  })
})

describe('exact length string requirement', () => {
  const length = 10
  const schema = new f.String().length(length)

  describe('correct length strings', () => {
    test('hello', () => expect(schema.validate('HelloWorld').success).toBe(true))
    test('emoji string', () => expect(schema.validate('😋📙😋📙📙').success).toBe(true))
  })

  describe('invalid string lengths', () => {
    test('empty string', () => {
      const expectedResult: ValidationResult<string> = {
        success: false,
        errors: [
          {
            code: 'length',
            message: `String has length of 0 which does not meet the requirement of a length of ${length}.`,
            path: []
          }
        ]
      }

      expect(schema.validate('')).toMatchObject(expectedResult)
    })

    test('long string', () => {
      const expectedResult: ValidationResult<string> = {
        success: false,
        errors: [
          {
            code: 'length',
            message: `String has length of 26 which does not meet the requirement of a length of ${length}.`,
            path: []
          }
        ]
      }

      expect(schema.validate('abcdefghijklmnopqrstuvwxyz')).toMatchObject(expectedResult)
    })
  })
})
