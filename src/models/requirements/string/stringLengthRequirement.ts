import type { RequirementValidationError } from '../../../types/ValidationResult'
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

  public validate(value: string): RequirementValidationError[] {
    const errors: RequirementValidationError[] = []

    const lengthError = this.validateLength(value)
    if (lengthError) errors.push(lengthError)

    const minError = this.validateMin(value)
    if (minError) errors.push(minError)

    const maxError = this.validateMax(value)
    if (maxError) errors.push(maxError)

    return errors
  }

  private validateLength(value: string): RequirementValidationError | undefined {
    if (!this.length) return undefined
    if (value.length == this.length) return undefined

    return {
      code: 'length',
      message: `String has length of ${value.length} which does not meet the requirement of a length of ${this.length}.`
    }
  }

  private validateMin(value: string): RequirementValidationError | undefined {
    if (!this.min) return undefined
    if (value.length >= this.min) return undefined

    return {
      code: 'minLength',
      message: `String has length of ${value.length} which does not meet the requirement of a minimum length of ${this.min}.`
    }
  }

  private validateMax(value: string): RequirementValidationError | undefined {
    if (!this.max) return undefined
    if (value.length <= this.max) return undefined

    return {
      code: 'maxLength',
      message: `String has length of ${value.length} which does not meet the requirement of a maximum length of ${this.max}.`
    }
  }
}
