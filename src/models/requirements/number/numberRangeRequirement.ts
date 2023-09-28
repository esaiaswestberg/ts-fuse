import RequirementValidationResults from '../../../types/requirements/RequirementValidationResults'
import Requirement from '../reqirement'

export default class NumberRangeRequirement extends Requirement {
  private minimumValue: number | undefined
  private maximumValue: number | undefined

  public setMinimumValue(minimumValue: number): void {
    this.minimumValue = minimumValue
  }

  public setMaximumValue(maximumValue: number): void {
    this.maximumValue = maximumValue
  }

  public validate(value: any): RequirementValidationResults {
    const results = []

    results.push(this.validateMinimumValue(value))
    results.push(this.validateMaximumValue(value))

    return this.combineRequirementValidationResults(results)
  }

  private validateMinimumValue(value: number): RequirementValidationResults {
    if (this.minimumValue && value < this.minimumValue) {
      return {
        success: false,
        errors: [
          {
            code: 'SIZE',
            message: `Value must be higher than ${this.minimumValue}`
          }
        ]
      }
    }

    return { success: true }
  }

  private validateMaximumValue(value: number): RequirementValidationResults {
    if (this.maximumValue && value > this.maximumValue) {
      return {
        success: false,
        errors: [
          {
            code: 'SIZE',
            message: `Value must be lower than ${this.maximumValue}`
          }
        ]
      }
    }

    return { success: true }
  }
}
