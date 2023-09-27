import f from '../../../src/index'
import type ValidationResult from '../../../src/types/ValidationResult'
import { RequirementErrorCodes } from '../../../src/types/ValidationResult'

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
          code: RequirementErrorCodes.TYPE,
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

describe('Integer number schema', () => {
  const schema = new f.Number().int()

  describe('valid numbers', () => {
    test('one', () => expect(schema.validate(1).success).toBe(true))
    test('zero', () => expect(schema.validate(0).success).toBe(true))
    test('negative one', () => expect(schema.validate(-1).success).toBe(true))
    test('1E308', () => expect(schema.validate(parseFloat('1E308')).success).toBe(true))
  })

  describe('invalid values', () => {
    test('square root of two', () => {
      const results = schema.validate(Math.sqrt(2))

      expect(results.success).toBe(false)
      if (!results.success) expect(results.errors[0].code).toBe(RequirementErrorCodes.PATTERN)
    })

    test('pi', () => {
      const results = schema.validate(Math.PI)

      expect(results.success).toBe(false)
      if (!results.success) expect(results.errors[0].code).toBe(RequirementErrorCodes.PATTERN)
    })

    test('eulers number', () => {
      const results = schema.validate(Math.E)

      expect(results.success).toBe(false)
      if (!results.success) expect(results.errors[0].code).toBe(RequirementErrorCodes.PATTERN)
    })

    test('1E-323', () => {
      const results = schema.validate(parseFloat('1E-323'))

      expect(results.success).toBe(false)
      if (!results.success) expect(results.errors[0].code).toBe(RequirementErrorCodes.PATTERN)
    })
  })
})
