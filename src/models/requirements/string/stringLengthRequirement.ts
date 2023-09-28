import RequirementValidationResults from '../../../types/requirements/RequirementValidationResults'
import Requirement from '../reqirement'

export default class StringLengthRequirement extends Requirement {
  private length: number | undefined
  private minimumLength: number | undefined
  private maximumLength: number | undefined

  public setLength(length: number) {
    if (this.minimumLength || this.maximumLength) throw new Error('Cannot set length when min or max is set')
    this.length = length
  }

  public setMinimumLength(min: number) {
    if (this.length) throw new Error('Cannot set min when length is set')
    if (this.maximumLength && min > this.maximumLength) throw new Error('Cannot set min greater than max')

    this.minimumLength = min
  }

  public setMaximumLength(max: number) {
    if (this.length) throw new Error('Cannot set max when length is set')
    if (this.minimumLength && max < this.minimumLength) throw new Error('Cannot set max less than min')

    this.maximumLength = max
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
    if (this.minimumLength && value.length < this.minimumLength) {
      return {
        success: false,
        errors: [
          {
            code: 'LENGTH',
            message: `Value must be at least ${this.minimumLength} characters long`
          }
        ]
      }
    }

    return { success: true }
  }

  private validateMaxLength(value: string): RequirementValidationResults {
    if (this.maximumLength && value.length > this.maximumLength) {
      return {
        success: false,
        errors: [
          {
            code: 'LENGTH',
            message: `Value must be at most ${this.maximumLength} characters long`
          }
        ]
      }
    }

    return { success: true }
  }
}
