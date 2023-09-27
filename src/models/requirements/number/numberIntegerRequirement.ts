import RequirementValidationResults, { RequirementValidationResultStatus } from '../../../types/requirements/RequirementValidationResults'
import Requirement from '../reqirement'

export default class NumberIntegerRequirement extends Requirement {
  public validate(value: number): RequirementValidationResults {
    // If a number is an integer, it will have no remainder when divided by 1.
    const remainder = Math.abs(value % 1)
    if (remainder > 0) {
      return {
        status: RequirementValidationResultStatus.ERROR,
        errors: [
          {
            code: 'PATTERN',
            message: 'Value must be an integer'
          }
        ]
      }
    }

    return { status: RequirementValidationResultStatus.OK }
  }
}
