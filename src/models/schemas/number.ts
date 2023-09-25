import NumberRequirement from '../requirements/number/numberRequirement'
import Schema from './schema'

export default class Number extends Schema {
  /**
   * Create a new Number schema.
   *
   * @returns The Number schema.
   */
  constructor() {
    super()

    super.createReqirement(NumberRequirement)
  }
}