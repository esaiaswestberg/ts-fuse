import { RequirementValidationErrorCode } from '../../src/types/requirements/RequirementValidationError'
import SchemaValidationResults from '../../src/types/schema/SchemaValidationResults'

export default class SchemaTestUtilities {
  public static checkSchemaResultErrorCodes<T>(results: SchemaValidationResults<T>, expectedErrorCodes: RequirementValidationErrorCode[]): boolean {
    if (results.success && expectedErrorCodes.length === 0) return true
    if (results.success) return false

    const actualErrorCodes = new Set(results.errors.map((error) => error.code))
    if (actualErrorCodes.size !== expectedErrorCodes.length) return false

    return expectedErrorCodes.every((expectedErrorCode) => actualErrorCodes.has(expectedErrorCode))
  }
}
