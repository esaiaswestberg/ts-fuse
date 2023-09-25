import type { RequirementValidationResult } from '../../../types/ValidationResult'
import Requirement from '../reqirement'

export default class StringLengthRequirement extends Requirement {
  private length: number | undefined
  private min: number | undefined
  private max: number | undefined

  /**
   * Set the required length.
   *
   * @param length Length to ensure the string has.
   */
  public setLength(length: number) {
    this.length = length
  }

  /**
   * Set the required minimum length.
   *
   * @param min Mimimum length to ensure the string has.
   */
  public setMin(min: number) {
    this.min = min
  }

  /**
   * Set the required maximum length.
   *
   * @param min Maximum length to ensure the string has.
   */
  public setMax(max: number) {
    this.max = max
  }

  /**
   * Validate that the strings length and set length and
   * is within the required range. Undefined length
   * requirements are not validated.
   *
   * @param value String to check the length of.
   * @returns True if all length requirements are met, otherwise false.
   */
  public validate(value: string): RequirementValidationResult[] {
    const errors: RequirementValidationResult[] = []

    const lengthError = this.validateLength(value)
    if (lengthError) errors.push(lengthError)

    const minError = this.validateMin(value)
    if (minError) errors.push(minError)

    const maxError = this.validateMax(value)
    if (maxError) errors.push(maxError)

    return errors
  }

  /**
   * Validate that the string has the required length.
   *
   * @param value String to check the length of.
   * @returns Undefined if the string has the required length, otherwise an error.
   */
  private validateLength(value: string): RequirementValidationResult | undefined {
    if (!this.length) return undefined
    if (value.length == this.length) return undefined

    return {
      code: 'length',
      message: `String has length of ${value.length} which does not meet the requirement of a length of ${this.length}.`
    }
  }

  /**
   * Validate that the string has the required minimum length.
   *
   * @param value String to check the length of.
   * @returns Undefined if the string has the required minimum length, otherwise an error.
   */
  private validateMin(value: string): RequirementValidationResult | undefined {
    if (!this.min) return undefined
    if (value.length >= this.min) return undefined

    return {
      code: 'minLength',
      message: `String has length of ${value.length} which does not meet the requirement of a minimum length of ${this.min}.`
    }
  }

  /**
   * Validate that the string has the required maximum length.
   *
   * @param value String to check the length of.
   * @returns Undefined if the string has the required maximum length, otherwise an error.
   */
  private validateMax(value: string): RequirementValidationResult | undefined {
    if (!this.max) return undefined
    if (value.length <= this.max) return undefined

    return {
      code: 'maxLength',
      message: `String has length of ${value.length} which does not meet the requirement of a maximum length of ${this.max}.`
    }
  }
}
