import RequirementValidationResults from '../../../types/requirements/RequirementValidationResults'
import Requirement from '../reqirement'

export default class BooleanRequirement extends Requirement {
  public validate(value: any): RequirementValidationResults {
    if (typeof value !== 'boolean') {
      return {
        success: false,
        errors: [
          {
            code: 'TYPE',
            message: 'Value must be a boolean'
          }
        ]
      }
    }

    return { success: true }
  }
}
