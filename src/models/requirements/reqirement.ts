import { RequirementValidationError } from '../../types/ValidationResult'

export default abstract class Requirement {
  public validate(value: any): RequirementValidationError[] {
    throw new Error('A blank requirement cannot be validated!')
  }
}
