import NumberRequirement from '../../../../src/models/requirements/number/numberRequirement'
import type { RequirementValidationError } from '../../../../src/types/ValidationResult'

describe('Number Requirement', () => {
  const requirement = new NumberRequirement()

  describe('valid numbers', () => {
    const expectedResult: RequirementValidationError[] = []

    test('one', () => expect(requirement.validate(1)).toMatchObject(expectedResult))
    test('zero', () => expect(requirement.validate(0)).toMatchObject(expectedResult))
    test('negative one', () => expect(requirement.validate(-1)).toMatchObject(expectedResult))

    test('square root of two', () => expect(requirement.validate(Math.sqrt(2))).toMatchObject(expectedResult))
    test('pi', () => expect(requirement.validate(Math.PI)).toMatchObject(expectedResult))
    test('eulers number', () => expect(requirement.validate(Math.E)).toMatchObject(expectedResult))
  })

  describe('invalid values', () => {
    const expectedResult: RequirementValidationError[] = [
      {
        code: 'type',
        message: 'Value is not a valid number.'
      }
    ]

    test('NaN', () => expect(requirement.validate(NaN)).toMatchObject(expectedResult))
    test('string', () => expect(requirement.validate('Hello World')).toMatchObject(expectedResult))
    test('numeric string', () => expect(requirement.validate('123')).toMatchObject(expectedResult))

    test('null', () => expect(requirement.validate(null)).toMatchObject(expectedResult))
    test('undefined', () => expect(requirement.validate(undefined)).toMatchObject(expectedResult))
  })
})
