import Boolean from './models/schemas/booleanSchema'
import Number from './models/schemas/numberSchema'
import String from './models/schemas/stringSchema'
import RequirementValidationError, { RequirementValidationErrorCode } from './types/requirements/RequirementValidationError'
import RequirementValidationResults from './types/requirements/RequirementValidationResults'
import SchemaValidationResults from './types/schema/SchemaValidationResults.d'

export default {
  String: () => new String(),
  Number: () => new Number(),
  Boolean: () => new Boolean()
}

export type { RequirementValidationError, RequirementValidationErrorCode, RequirementValidationResults, SchemaValidationResults }
