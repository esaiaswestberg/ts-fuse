import type { RequirementValidationError } from '../../../types/ValidationResult'
import Requirement from '../reqirement'

export default class NumberIntegerRequirement extends Requirement {
  /**
   * Validate that the numeric value is an integer.
   *
   * @param value Numeric value to check.
   * @returns A requirement validation error if the value is
   * not an integer, otherwise an empty array.
   */
  public validate(value: number): RequirementValidationError[] {
    // If the remainder after dividing by one is zero, it is an integer
    if (value % 1 === 0) return []

    return [
      {
        code: 'pattern',
        message: `Value of ${value} is not an integer.`
      }
    ]
  }
}
