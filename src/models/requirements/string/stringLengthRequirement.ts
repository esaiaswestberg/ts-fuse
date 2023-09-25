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
  public validate(value: string) {
    if (this.length && value.length !== this.length) return false
    if (this.min && value.length < this.min) return false
    if (this.max && value.length > this.max) return false

    return true
  }
}
