import { RequirementErrorCodes, type RequirementValidationError } from '../../../types/ValidationResult'
import Requirement from '../reqirement'

export default class NumberIntegerRequirement extends Requirement {
  public validate(value: number): RequirementValidationError[] {
    // Any remainder after dividing by 1 means that the number is not an integer.
    if (value % 1 === 0) return []

    return [
      {
        code: RequirementErrorCodes.PATTERN,
        message: `Value of ${value} is not an integer.`
      }
    ]
  }
}
