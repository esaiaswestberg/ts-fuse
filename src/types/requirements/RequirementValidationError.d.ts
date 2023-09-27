export type RequirementValidationErrorCode = 'TYPE' | 'LENGTH' | 'SIZE' | 'PATTERN' | 'STRUCTURE'

type RequirementValidationError = {
  code: RequirementValidationErrorCode
  message: string
}

export default RequirementValidationError
