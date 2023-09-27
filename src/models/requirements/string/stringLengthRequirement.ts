import RequirementValidationResults from '../../../types/requirements/RequirementValidationResults'
import Requirement from '../reqirement'

export default class StringLengthRequirement extends Requirement {
  private length: number | undefined
  private min: number | undefined
  private max: number | undefined

  public setLength(length: number) {
    this.length = length
  }

  public setMin(min: number) {
    this.min = min
  }

  public setMax(max: number) {
    this.max = max
  }

  public validate(value: string): RequirementValidationResults {
    const results = []

    results.push(this.validateExactLength(value))
    results.push(this.validateMinLength(value))
    results.push(this.validateMaxLength(value))

    return this.combineRequirementValidationResults(results)
  }

  private validateExactLength(value: string): RequirementValidationResults {
    if (this.length && value.length !== this.length) {
      return {
        success: false,
        errors: [
          {
            code: 'LENGTH',
            message: `Value must be ${this.length} characters long`
          }
        ]
      }
    }

    return { success: true }
  }

  private validateMinLength(value: string): RequirementValidationResults {
    if (this.min && value.length >= this.min) {
      return {
        success: false,
        errors: [
          {
            code: 'LENGTH',
            message: `Value must be at least ${this.min} characters long`
          }
        ]
      }
    }

    return { success: true }
  }

  private validateMaxLength(value: string): RequirementValidationResults {
    if (this.max && value.length <= this.max) {
      return {
        success: false,
        errors: [
          {
            code: 'LENGTH',
            message: `Value must be at most ${this.max} characters long`
          }
        ]
      }
    }

    return { success: true }
  }
}
