import RequirementValidationError from '../../types/requirements/RequirementValidationError'
import RequirementValidationResults from '../../types/requirements/RequirementValidationResults'

export default abstract class Requirement {
  public validate(value: any): RequirementValidationResults {
    throw new Error('A blank requirement cannot be validated!')
  }

  protected combineRequirementValidationResults(results: RequirementValidationResults[]): RequirementValidationResults {
    const errorResults = results.filter((result) => {
      result.success === false
    })

    if (errorResults.length > 0) {
      return {
        success: false,
        // @ts-expect-error - As the filter above ensures that all results are errors, this is safe.
        errors: errorResults.flatMap((result) => result.errors)
      }
    }

    return { success: true }
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
