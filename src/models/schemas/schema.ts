import type ValidationResult from '../../types/ValidationResult'
import { RequirementValidationResult, ValidationError } from '../../types/ValidationResult'
import Requirement from '../requirements/reqirement'

export default abstract class Schema {
  private requirements: Requirement[] = []

  /**
   * Validate a value against the schema.
   *
   * @param value The value to validate.
   * @returns True if the value comforms to the schema, false otherwise.
   */
  public validate<T>(value: T): ValidationResult<T> {
    const results = this.requirements.flatMap((requirement) => requirement.validate(value))

    const success = results.length === 0
    if (success) return { success, value }

    return {
      success,
      errors: results.map(Schema.addErrorPath)
    }
  }

  /**
   * Create a new requiremet of the specified type,
   * if no requirement of that type already exists on schema.
   *
   * @param requirementClass Requirement class type.
   * @returns A requirement class instance.
   */
  protected createReqirement<T extends Requirement>(requirementClass: new () => T): T {
    let requirement = this.getRequirement(requirementClass)
    if (!requirement) {
      requirement = new requirementClass()
      this.requirements.push(requirement)
    }

    return requirement
  }

  /**
   * Get requirement of the specified type.
   *
   * @param requirementClass Requirement class type.
   * @returns The requirement class instance or undefined if none exists.
   */
  private getRequirement<T extends Requirement>(requirementClass: new () => T): T | undefined {
    return this.requirements.find((requirement) => requirement instanceof requirementClass) as T | undefined
  }

  private static addErrorPath(requirementValidationResult: RequirementValidationResult): ValidationError {
    return {
      ...requirementValidationResult,
      path: []
    }
  }
}
