import f from '../../../src/index'
import type ValidationResult from '../../../src/types/ValidationResult'

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
    const expectedResult: ValidationResult<number> = {
      success: false,
      errors: [
        {
          code: 'type',
          message: 'Value is not a valid number.',
          path: []
        }
      ]
    }

    test('NaN', () => expect(schema.validate(NaN)).toMatchObject(expectedResult))
    test('string', () => expect(schema.validate('')).toMatchObject(expectedResult))
    test('numeric string', () => expect(schema.validate('123')).toMatchObject(expectedResult))

    test('null', () => expect(schema.validate(null)).toMatchObject(expectedResult))
    test('undefined', () => expect(schema.validate(undefined)).toMatchObject(expectedResult))
  })
})
