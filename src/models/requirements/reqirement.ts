import RequirementValidationError from '../../types/requirements/RequirementValidationError'
import RequirementValidationResults, { RequirementValidationResultStatus } from '../../types/requirements/RequirementValidationResults'

export default abstract class Requirement {
  public validate(value: any): RequirementValidationResults {
    throw new Error('A blank requirement cannot be validated!')
  }

  protected combineRequirementValidationResults(results: RequirementValidationResults[]): RequirementValidationResults {
    const errorResults = results.filter((result) => {
      result.status === RequirementValidationResultStatus.ERROR
    })

    if (errorResults.length > 0) {
      return {
        status: RequirementValidationResultStatus.ERROR,
        // @ts-expect-error - As the filter above ensures that all results are errors, this is safe.
        errors: errorResults.flatMap((result) => result.errors)
      }
    }

    return { status: RequirementValidationResultStatus.OK }
  }

  public static areRequirementValidationResultsOK(results: RequirementValidationResults[]): boolean {
    return results.every((result) => result.status === RequirementValidationResultStatus.OK)
  }

  public static extractRequirementValidationErrors(results: RequirementValidationResults[]): RequirementValidationError[] {
    return results.flatMap((result) => {
      if (result.status === RequirementValidationResultStatus.ERROR) return result.errors
      return []
    })
  }
}
