import { RequirementValidationResult } from '../../types/ValidationResult'

export default abstract class Requirement {
  /**
   * Abstract class method to be overridden in extended classes.
   *
   * @param value Value to validate against reqirement.
   */
  public validate(value: any): RequirementValidationResult[] {
    throw new Error('A blank requirement cannot be validated!')
  }
}
