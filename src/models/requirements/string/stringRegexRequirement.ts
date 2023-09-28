import RequirementValidationResults from '../../../types/requirements/RequirementValidationResults'
import Requirement from '../reqirement'

export default class StringRegexRequirement extends Requirement {
  private validationPattern: RegExp = /.*/g

  public setPattern(regexPattern: RegExp) {
    this.validationPattern = regexPattern
  }

  public setPatternString(regexPattern: string) {
    this.validationPattern = new RegExp(regexPattern)
  }

  public validate(value: string): RequirementValidationResults {
    const patternMatch = this.validationPattern.test(value)

    if (!patternMatch) {
      return {
        success: patternMatch,
        errors: [
          {
            code: 'PATTERN',
            message: `Value "${value}" does not match pattern ${this.validationPattern.toString()}`
          }
        ]
      }
    }

    return { success: patternMatch }
  }
}
