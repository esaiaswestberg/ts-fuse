import RequirementValidationResults from '../../../types/requirements/RequirementValidationResults'
import Requirement from '../reqirement'

export default class StringLengthRequirement extends Requirement {
  private length: number | undefined
  private min: number | undefined
  private max: number | undefined

  public setLength(length: number) {
    if (this.min || this.max) throw new Error('Cannot set length when min or max is set')
    this.length = length
  }

  public setMin(min: number) {
    if (this.length) throw new Error('Cannot set min when length is set')
    if (this.max && min > this.max) throw new Error('Cannot set min greater than max')

    this.min = min
  }

  public setMax(max: number) {
    if (this.length) throw new Error('Cannot set max when length is set')
    if (this.min && max < this.min) throw new Error('Cannot set max less than min')

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
