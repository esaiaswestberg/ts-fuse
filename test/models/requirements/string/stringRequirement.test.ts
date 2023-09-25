import StringRequirement from '../../../../src/models/requirements/string/stringRequirement'
import type { RequirementValidationError } from '../../../../src/types/ValidationResult'

describe('String Requirement', () => {
  const requirement = new StringRequirement()
  describe('valid strings', () => {
    const expectedResult: RequirementValidationError[] = []
    test('filled string', () => expect(requirement.validate('Hello')).toMatchObject(expectedResult))
    test('emoji string', () => expect(requirement.validate('😋📙')).toMatchObject(expectedResult))
    test('empty string', () => expect(requirement.validate('')).toMatchObject(expectedResult))
  })

  describe('non string values', () => {
    const expectedResult: RequirementValidationError[] = [
      {
        code: 'type',
        message: 'Value is not a valid string.'
      }
    ]

    test('empty object', () => expect(requirement.validate({})).toMatchObject(expectedResult))
    test('object with data', () => expect(requirement.validate(expectedResult)).toMatchObject(expectedResult))

    test('integer', () => expect(requirement.validate(123456)).toMatchObject(expectedResult))
    test('float', () => expect(requirement.validate(123.456)).toMatchObject(expectedResult))

    test('undefined', () => expect(requirement.validate(undefined)).toMatchObject(expectedResult))
    test('null', () => expect(requirement.validate(null)).toMatchObject(expectedResult))
  })
})
