import StringLengthRequirement from '../requirements/string/stringLengthRequirement'
import StringRequirement from '../requirements/string/stringRequirement'
import Schema from './schema'

export default class String extends Schema {
  /**
   * Create a new String schema.
   *
   * @returns The String schema.
   */
  constructor() {
    super()

    super.createRequirement(StringRequirement)
  }

  /**
   * Require a string to be a certain length.
   *
   * @param length The length the string must be.
   * @returns The String schema.
   */
  public length(length: number): String {
    const stringLengthRequirement = this.createRequirement(StringLengthRequirement)
    stringLengthRequirement.setLength(length)

    return this
  }
}
