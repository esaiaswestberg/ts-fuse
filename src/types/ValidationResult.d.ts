/**
 * A validation result can either be a success result or an error result.
 * The value of success determines which it is.
 */
type ValidationResult<T> = SuccessValidationResult<T> | ErrorValidationResult

/**
 * In case of a successful validation, only success status and a typed value is returned.
 */
export type SuccessValidationResult<T> = {
  success: true
  value: T
}

/**
 * In case of an unseccessful validation, the success status and an array of errors are returned.
 */
export type ErrorValidationResult = {
  success: false
  errors: ValidationError[]
}

/**
 * A validation error is a requirement validation error with an added path in case of objects
 * to allow for easy indentification of the erroneous field.
 */
export type ValidationError = RequirementValidationError & {
  path: string[]
}

/**
 * A requirement validation error consists of a code for error parsing as well as a message
 * for a more human-readable format.
 */
export type RequirementValidationError = {
  code: string
  message: string
}

export default ValidationResult
