import StringLengthRequirement from '../requirements/stringLengthRequirement'
import Schema from './schema'

export default class String extends Schema {
  public length(length: number): String {
    const stringLengthRequirement = this.createReqirement(StringLengthRequirement)
    stringLengthRequirement.setLength(length)

    return this
  }
}
