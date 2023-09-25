import type { RequirementValidationError } from '../../../../src/types/ValidationResult'
import StringLengthRequirement from './../../../../src/models/requirements/string/stringLengthRequirement'

describe('String Length Requirement', () => {
  describe('invalid requirment configurations', () => {
    test('empty string length requirement', () => {
      const requirement = new StringLengthRequirement()

      const expectedResult: RequirementValidationError[] = []
      expect(requirement.validate('Hello')).toMatchObject(expectedResult)
    })

    describe('negative lengths', () => {
      test('negative exact length', () => {
        const requirement = new StringLengthRequirement()
        expect(requirement.setLength(-5)).toThrowError()
      })

      test('negative minimum length', () => {
        const requirement = new StringLengthRequirement()
        expect(requirement.setMin(-5)).toThrowError()
      })

      test('negative maximum length', () => {
        const requirement = new StringLengthRequirement()
        expect(requirement.setMax(-5)).toThrowError()
      })
    })
  })

  describe('exact string length', () => {
    test('valid string length', () => {
      const requirement = new StringLengthRequirement()
      requirement.setLength(5)

      const expectedResult: RequirementValidationError[] = []
      expect(requirement.validate('Hello')).toMatchObject(expectedResult)
    })

    test('invalid string length', () => {
      const requirement = new StringLengthRequirement()
      requirement.setLength(4)

      const expectedResult: RequirementValidationError[] = [
        {
          code: 'length',
          message: 'String has length of 5 which does not meet the requirement of a length of 4.'
        }
      ]

      expect(requirement.validate('Hello')).toMatchObject(expectedResult)
    })
  })

  describe('minimum string length', () => {
    test('valid string length', () => {
      const requirement = new StringLengthRequirement()
      requirement.setMin(5)

      const expectedResult: RequirementValidationError[] = []
      expect(requirement.validate('Hello')).toMatchObject(expectedResult)
    })

    test('invalid string length', () => {
      const requirement = new StringLengthRequirement()
      requirement.setMin(10)

      const expectedResult: RequirementValidationError[] = [
        {
          code: 'minLength',
          message: 'String has length of 5 which does not meet the requirement of a minimum length of 10.'
        }
      ]

      expect(requirement.validate('Hello')).toMatchObject(expectedResult)
    })
  })

  describe('maximum string length', () => {
    test('valid string length', () => {
      const requirement = new StringLengthRequirement()
      requirement.setMax(5)

      const expectedResult: RequirementValidationError[] = []
      expect(requirement.validate('Hello')).toMatchObject(expectedResult)
    })

    test('invalid string length', () => {
      const requirement = new StringLengthRequirement()
      requirement.setMax(1)

      const expectedResult: RequirementValidationError[] = [
        {
          code: 'maxLength',
          message: 'String has length of 5 which does not meet the requirement of a maximum length of 1.'
        }
      ]

      expect(requirement.validate('Hello')).toMatchObject(expectedResult)
    })
  })
})
