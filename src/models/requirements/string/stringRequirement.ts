import Requirement from '../reqirement'

export default class StringRequirement extends Requirement {
  /**
   * Validate that the value is of type string.
   *
   * @param value Value to validate.
   * @returns True if the value is a string, false otherwise.
   */
  public validate(value: any) {
    return typeof value === 'string'
  }
}
