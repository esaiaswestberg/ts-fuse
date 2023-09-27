export enum RequirementValidationErrorCode {
  TYPE = 'TYPE',
  LENGTH = 'LENGTH',
  SIZE = 'SIZE',
  PATTERN = 'PATTERN',
  STRUCTURE = 'STRUCTURE'
}

type RequirementValidationError = {
  code: RequirementValidationErrorCode
  message: string
}

export default RequirementValidationError
