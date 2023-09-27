import RequirementValidationError from '../../types/requirements/RequirementValidationError'
import RequirementValidationResults from '../../types/requirements/RequirementValidationResults'

export default abstract class Requirement {
  public validate(value: any): RequirementValidationResults {
    throw new Error('A blank requirement cannot be validated!')
  }

  protected combineRequirementValidationResults(results: RequirementValidationResults[]): RequirementValidationResults {
    const success = Requirement.areRequirementValidationResultsOK(results)
    if (!success) {
      return {
        success: false,
        errors: Requirement.extractRequirementValidationErrors(results)
      }
    }

    return { success }
  }

  public static areRequirementValidationResultsOK(results: RequirementValidationResults[]): boolean {
    return results.every((result) => result.success === true)
  }

  public static extractRequirementValidationErrors(results: RequirementValidationResults[]): RequirementValidationError[] {
    return results.flatMap((result) => {
      if (result.success === false) return result.errors
      return []
    })
  }
}
