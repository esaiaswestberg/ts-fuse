import type { RequirementValidationError } from '../../../types/ValidationResult'
import Requirement from '../reqirement'

export default class NumberRequirement extends Requirement {
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
