import RequirementValidationError from './RequirementValidationError'

type RequirementValidationResults =
  | {
      success: true
    }
  | {
      success: false
      errors: RequirementValidationError[]
    }

export default RequirementValidationResults
