import f from '../../../src/index'
import ValidationResult, { RequirementErrorCodes } from '../../../src/types/ValidationResult'

describe('Boolean schema', () => {
  const schema = new f.Boolean()

  describe('valid booleans', () => {
    test('true', () => expect(schema.validate(true).success).toBe(true))
    test('false', () => expect(schema.validate(false).success).toBe(true))
  })

  describe('invalid values', () => {
    const expectedResult: ValidationResult<boolean> = {
      success: false,
      errors: [
        {
          code: RequirementErrorCodes.TYPE,
          message: 'Value is not a boolean.',
          path: []
        }
      ]
    }

    test('null', () => expect(schema.validate(null)).toMatchObject(expectedResult))
    test('undefined', () => expect(schema.validate(undefined)).toMatchObject(expectedResult))
    test('empty string', () => expect(schema.validate('')).toMatchObject(expectedResult))
    test('numeric string', () => expect(schema.validate('123')).toMatchObject(expectedResult))
    test('string', () => expect(schema.validate('foo')).toMatchObject(expectedResult))
    test('number', () => expect(schema.validate(123)).toMatchObject(expectedResult))
    test('object', () => expect(schema.validate({})).toMatchObject(expectedResult))
    test('array', () => expect(schema.validate([])).toMatchObject(expectedResult))
  })
})
