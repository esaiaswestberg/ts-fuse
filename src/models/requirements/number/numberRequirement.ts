import type { RequirementValidationError } from '../../../types/ValidationResult'
import Requirement from '../reqirement'

export default class NumberRequirement extends Requirement {
  /**
   * Validate that the value is of type number.
   *
   * @param value Value to validate.
   * @returns Error in array if value is not a number, otherwise an empty array.
   */
  public validate(value: any): RequirementValidationError[] {
    let validNumber = true

    if (typeof value !== 'number') validNumber = false
    if (isNaN(value)) validNumber = false

    if (validNumber) return []
    else {
      return [
        {
          code: 'type',
          message: 'Value is not a valid number.'
        }
      ]
    }
  }
}
