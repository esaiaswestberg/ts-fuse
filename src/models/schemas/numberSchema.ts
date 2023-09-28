import NumberIntegerRequirement from '../requirements/number/numberIntegerRequirement'
import NumberRequirement from '../requirements/number/numberRequirement'
import Schema from './schema'

export default class Number extends Schema<number> {
  /**
   * Create a new Number schema.
   *
   * @returns The Number schema.
   */
  constructor() {
    super()

    super.addRequirement(NumberRequirement)
  }

  public int(): Number {
    this.addRequirement(NumberIntegerRequirement)
    return this
  }
}
