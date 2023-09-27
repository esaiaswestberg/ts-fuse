import type SchemaValidationResults from '../../types/schema/SchemaValidationResults.d'
import Requirement from '../requirements/reqirement'

export default abstract class Schema {
  private requirements: Requirement[] = []

  public validate<T>(value: T): SchemaValidationResults<T> {
    const results = this.requirements.flatMap((requirement) => requirement.validate(value))

    const success = results.length === 0
    if (success) return { success, value }

    return {
      success: false,
      errors: []
    }
  }

  protected createRequirement<T extends Requirement>(requirementClass: new () => T): T {
    let requirement = this.getRequirement(requirementClass)
    if (!requirement) {
      requirement = new requirementClass()
      this.requirements.push(requirement)
    }

    return requirement
  }

  private getRequirement<T extends Requirement>(requirementClass: new () => T): T | undefined {
    return this.requirements.find((requirement) => requirement instanceof requirementClass) as T | undefined
  }
}
