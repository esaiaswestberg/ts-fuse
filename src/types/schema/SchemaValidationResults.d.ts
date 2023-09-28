import RequirementValidationError from '../requirements/RequirementValidationError'

type SchemaValidationResults<T> =
  | {
      success: true
      value: T
    }
  | {
      success: false
      errors: RequirementValidationError[]
    }

export default SchemaValidationResults
