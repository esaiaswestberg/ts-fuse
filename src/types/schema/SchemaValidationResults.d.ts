import RequirementValidationError from '../requirements/RequirementValidationError'

export type SchemaValidationError = RequirementValidationError & {
  path: string[]
}

type SchemaValidationResults<T> =
  | {
      success: true
      value: T
    }
  | {
      success: false
      errors: SchemaValidationError[]
    }

export default SchemaValidationResults
