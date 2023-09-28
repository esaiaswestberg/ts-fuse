import RequirementValidationResults from '../../types/requirements/RequirementValidationResults'
import type SchemaValidationResults from '../../types/schema/SchemaValidationResults.d'
import Requirement from '../requirements/reqirement'

export default abstract class Schema<T> {
  private requirements: Requirement[] = []
  private defaultValue: T | undefined

  public default(value: T) {
    if (this.defaultValue) throw new Error('Default value is already set')
    this.defaultValue = value

    return this
  }

  public validate(input: any): SchemaValidationResults<T> {
    const value = this.getValueWithDefaultApplied(input)

    const requirementValidationResults = this.validateAllRequirements(value)
    const success = Requirement.areRequirementValidationResultsOK(requirementValidationResults)

    if (!success) {
      const requirementValidationErrors = Requirement.extractRequirementValidationErrors(requirementValidationResults)

      return {
        success,
        errors: requirementValidationErrors
      }
    }

    return { success, value }
  }

  protected addRequirement<T extends Requirement>(requirementClass: new () => T): T {
    let requirement = this.getRequirement(requirementClass)
    if (!requirement) {
      requirement = new requirementClass()
      this.requirements.push(requirement)
    }

    return requirement
  }

  private getValueWithDefaultApplied(value: any) {
    const valueIsUnset = value === undefined || value === null
    const hasDefaultValue = this.defaultValue !== undefined

    if (valueIsUnset && hasDefaultValue) return this.defaultValue
    return value
  }

  private getRequirement<T extends Requirement>(requirementClass: new () => T): T | undefined {
    return this.requirements.find((requirement) => requirement instanceof requirementClass) as T | undefined
  }

  private validateAllRequirements<T>(value: T): RequirementValidationResults[] {
    return this.requirements.map((requirement) => requirement.validate(value))
  }
}
