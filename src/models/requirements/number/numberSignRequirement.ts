import RequirementValidationResults from '../../../types/requirements/RequirementValidationResults'
import Requirement from '../reqirement'

export default class NumberSignRequirement extends Requirement {
  private isPositive: boolean = false
  private isNegative: boolean = false

  public setPositive() {
    if (this.isNegative) throw new Error('Cannot set positive when negative is already set')

    this.isPositive = true
  }

  public setNegative() {
    if (this.isPositive) throw new Error('Cannot set negative when positive is already set')

    this.isNegative = true
  }

  public validate(value: any): RequirementValidationResults {
    const results: RequirementValidationResults[] = []

    results.push(this.validatePositive(value))
    results.push(this.validateNegative(value))

    return this.combineRequirementValidationResults(results)
  }

  private validatePositive(value: number): RequirementValidationResults {
    if (this.isPositive && !this.isValuePositive(value)) {
      return {
        success: false,
        errors: [
          {
            code: 'SIZE',
            message: 'Value must be positive'
          }
        ]
      }
    }

    return { success: true }
  }

  private validateNegative(value: number): RequirementValidationResults {
    if (this.isNegative && this.isValuePositive(value)) {
      return {
        success: false,
        errors: [
          {
            code: 'SIZE',
            message: 'Value must be negative'
          }
        ]
      }
    }

    return { success: true }
  }

  private isValuePositive(value: number): boolean {
    // Since zero is neither positive nor negative, I have made the decision to recognize it as positive.
    return value >= 0
  }
}
