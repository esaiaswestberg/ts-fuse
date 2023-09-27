import { RequirementValidationErrorCode } from '../../../types/requirements/RequirementValidationError'
import RequirementValidationResults, { RequirementValidationResultStatus } from '../../../types/requirements/RequirementValidationResults'
import Requirement from '../reqirement'

export default class BooleanRequirement extends Requirement {
  public validate(value: any): RequirementValidationResults {
    if (typeof value !== 'boolean') {
      return {
        status: RequirementValidationResultStatus.ERROR,
        errors: [
          {
            code: RequirementValidationErrorCode.TYPE,
            message: 'Value must be a boolean'
          }
        ]
      }
    }

    return { status: RequirementValidationResultStatus.OK }
  }
}
