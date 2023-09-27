import Boolean from './models/schemas/booleanSchema'
import Number from './models/schemas/numberSchema'
import String from './models/schemas/stringSchema'

export default {
  String: () => new String(),
  Number: () => new Number(),
  Boolean: () => new Boolean()
}
