import { RequirementErrorCodes, RequirementValidationError } from '../../../types/ValidationResult'
import Requirement from '../reqirement'

export default class BooleanRequirement extends Requirement {
  public validate(value: any): RequirementValidationError[] {
    if (typeof value === 'boolean') return []

    return [
      {
        code: RequirementErrorCodes.TYPE,
        message: 'Value is not a boolean.'
      }
    ]
  }
}
