import RequirementValidationResults from '../../../types/requirements/RequirementValidationResults'
import Requirement from '../reqirement'

export default class NumberParityRequirement extends Requirement {
  private isEven: boolean = false
  private isOdd: boolean = false

  public setEven() {
    if (this.isOdd) throw new Error('Cannot set even when odd is already set')

    this.isEven = true
  }

  public setOdd() {
    if (this.isEven) throw new Error('Cannot set odd when even is already set')

    this.isOdd = true
  }

  public validate(value: number): RequirementValidationResults {
    const results: RequirementValidationResults[] = []

    results.push(this.validateEven(value))
    results.push(this.validateOdd(value))

    return this.combineRequirementValidationResults(results)
  }

  private validateEven(value: number): RequirementValidationResults {
    if (this.isEven && !this.isValueEven(value)) {
      return {
        success: false,
        errors: [
          {
            code: 'SIZE',
            message: 'Value must be even'
          }
        ]
      }
    }

    return { success: true }
  }

  private validateOdd(value: number): RequirementValidationResults {
    if (this.isOdd && this.isValueEven(value)) {
      return {
        success: false,
        errors: [
          {
            code: 'SIZE',
            message: 'Value must be odd'
          }
        ]
      }
    }

    return { success: true }
  }

  private isValueEven(value: number): boolean {
    return value % 2 === 0
  }
}
