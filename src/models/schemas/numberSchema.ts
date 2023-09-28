import NumberIntegerRequirement from '../requirements/number/numberIntegerRequirement'
import NumberRangeRequirement from '../requirements/number/numberRangeRequirement'
import NumberRequirement from '../requirements/number/numberRequirement'
import Schema from './schema'

export default class Number extends Schema<number> {
  constructor() {
    super()

    super.addRequirement(NumberRequirement)
  }

  public int(): Number {
    this.addRequirement(NumberIntegerRequirement)
    return this
  }

  public min(minimumValue: number): Number {
    const numberRangeRequirement = this.addRequirement(NumberRangeRequirement)
    numberRangeRequirement.setMinimumValue(minimumValue)

    return this
  }

  public max(maximumValue: number): Number {
    const numberRangeRequirement = this.addRequirement(NumberRangeRequirement)
    numberRangeRequirement.setMaximumValue(maximumValue)

    return this
  }
}
