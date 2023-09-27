import RequirementValidationResults from '../../../types/requirements/RequirementValidationResults'
import Requirement from '../reqirement'

export default class NumberRequirement extends Requirement {
  public validate(value: any): RequirementValidationResults {
    const success = this.checkType(value) && this.checkNaN(value)
    if (!success) {
      return {
        success: false,
        errors: [
          {
            code: 'TYPE',
            message: 'Value must be a number'
          }
        ]
      }
    }

    return { success: true }
  }

  private checkType(value: any): boolean {
    return typeof value === 'number'
  }

  private checkNaN(value: number): boolean {
    return !isNaN(value)
  }
}
