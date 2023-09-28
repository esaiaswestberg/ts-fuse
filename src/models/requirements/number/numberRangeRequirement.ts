import RequirementValidationResults from '../../../types/requirements/RequirementValidationResults'
import Requirement from '../reqirement'

export default class NumberRangeRequirement extends Requirement {
  private minimumValue: number | undefined
  private maximumValue: number | undefined

  public setMinimumValue(minimumValue: number): void {
    if (this.maximumValue && minimumValue > this.maximumValue) throw new Error('Minimum value cannot be higher than maximum value')

    this.minimumValue = minimumValue
  }

  public setMaximumValue(maximumValue: number): void {
    if (this.minimumValue && maximumValue < this.minimumValue) throw new Error('Maximum value cannot be lower than minimum value')

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
