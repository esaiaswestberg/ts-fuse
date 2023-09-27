import RequirementValidationError from './RequirementValidationError'

export enum RequirementValidationResultStatus {
  OK = 'OK',
  ERROR = 'ERROR'
}

type RequirementValidationResults =
  | {
      status: RequirementValidationResultStatus.OK
    }
  | {
      status: RequirementValidationResultStatus.ERROR
      errors: RequirementValidationError[]
    }

export default RequirementValidationResults
