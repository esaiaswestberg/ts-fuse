import RequirementValidationResults from '../../../types/requirements/RequirementValidationResults'
import Requirement from '../reqirement'

export default class StringRequirement extends Requirement {
  public validate(value: any): RequirementValidationResults {
    if (typeof value !== 'string') {
      return {
        success: false,
        errors: [
          {
            code: 'TYPE',
            message: 'Value must be a string'
          }
        ]
      }
    }

    return { success: true }
  }
}
