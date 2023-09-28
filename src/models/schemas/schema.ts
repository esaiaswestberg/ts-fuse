import RequirementValidationError from '../../types/requirements/RequirementValidationError'
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

  public validate(value: any): SchemaValidationResults<T> {
    if (this.shouldReturnDefault(value)) {
      return this.getSuccessValidationResults(this.defaultValue as T)
    }

    return this.getValidationResults(value)
  }

  private getValidationResults(value: any): SchemaValidationResults<T> {
    const requirementValidationResults = this.validateAllRequirements(value)
    const success = Requirement.areRequirementValidationResultsOK(requirementValidationResults)

    if (!success) {
      const requirementValidationErrors = Requirement.extractRequirementValidationErrors(requirementValidationResults)
      return this.getFailureValidationResults(requirementValidationErrors)
    }

    return this.getSuccessValidationResults(value)
  }

  protected addRequirement<T extends Requirement>(requirementClass: new () => T): T {
    let requirement = this.getRequirement(requirementClass)
    if (!requirement) {
      requirement = new requirementClass()
      this.requirements.push(requirement)
    }

    return requirement
  }

  protected hasRequirement<T extends Requirement>(requirementClass: new () => T): boolean {
    return this.requirements.some((requirement) => requirement instanceof requirementClass)
  }

  private getSuccessValidationResults(value: T): SchemaValidationResults<T> {
    return { success: true, value }
  }

  private getFailureValidationResults(errors: RequirementValidationError[]): SchemaValidationResults<T> {
    return { success: false, errors }
  }

  private shouldReturnDefault(value: any): boolean {
    const valueIsUnset = value === undefined || value === null
    const hasDefaultValue = this.defaultValue !== undefined

    return valueIsUnset && hasDefaultValue
  }

  private getRequirement<T extends Requirement>(requirementClass: new () => T): T | undefined {
    return this.requirements.find((requirement) => requirement instanceof requirementClass) as T | undefined
  }

  private validateAllRequirements<T>(value: T): RequirementValidationResults[] {
    return this.requirements.map((requirement) => requirement.validate(value))
  }
}
