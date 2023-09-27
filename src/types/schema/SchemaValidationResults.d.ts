import { RequirementValidationErrorCode } from '../requirements/RequirementValidationError'

export type SchemaValidationError = {
  code: RequirementValidationErrorCode
  message: string
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
