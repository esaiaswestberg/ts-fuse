import StringLengthRequirement from '../requirements/string/stringLengthRequirement'
import StringRequirement from '../requirements/string/stringRequirement'
import Schema from './schema'

export default class String extends Schema {
  constructor() {
    super()

    super.createReqirement(StringRequirement)
  }

  public length(length: number): String {
    const stringLengthRequirement = this.createReqirement(StringLengthRequirement)
    stringLengthRequirement.setLength(length)

    return this
  }
}
