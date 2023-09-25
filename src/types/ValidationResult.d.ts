type ValidationResult<T> = SuccessValidationResult<T> | ErrorValidationResult

export type SuccessValidationResult<T> = {
  success: true
  value: T
}

export type ErrorValidationResult = {
  success: false
  errors: ValidationError[]
}

export type ValidationError = RequirementValidationResult & {
  path: string[]
}

export type RequirementValidationResult = {
  code: string
  message: string
}

export default ValidationResult
