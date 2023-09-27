import type { RequirementValidationError } from '../../../types/ValidationResult'
import Requirement from '../reqirement'

export default class StringRequirement extends Requirement {
  public validate(value: any): RequirementValidationError[] {
    if (typeof value === 'string') return []

    return [
      {
        code: 'type',
        message: 'Value is not a valid string.'
      }
    ]
  }
}
