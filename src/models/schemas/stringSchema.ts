import StringLengthRequirement from '../requirements/string/stringLengthRequirement'
import StringRegexRequirement from '../requirements/string/stringRegexRequirement'
import StringRequirement from '../requirements/string/stringRequirement'
import Schema from './schema'

export default class String extends Schema<string> {
  constructor() {
    super()

    super.addRequirement(StringRequirement)
  }

  public length(length: number): String {
    const stringLengthRequirement = this.addRequirement(StringLengthRequirement)
    stringLengthRequirement.setLength(length)

    return this
  }

  public minLength(minLength: number): String {
    const stringLengthRequirement = this.addRequirement(StringLengthRequirement)
    stringLengthRequirement.setMinimumLength(minLength)

    return this
  }

  public maxLength(maxLength: number): String {
    const stringLengthRequirement = this.addRequirement(StringLengthRequirement)
    stringLengthRequirement.setMaximumLength(maxLength)

    return this
  }

  public regex(regexPattern: RegExp | string): String {
    const stringRegexRequirement = this.addRequirement(StringRegexRequirement)

    if (regexPattern instanceof RegExp) stringRegexRequirement.setPattern(regexPattern)
    else stringRegexRequirement.setPatternString(regexPattern)

    return this
  }
}
