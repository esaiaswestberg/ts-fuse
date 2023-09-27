import BooleanRequirement from '../requirements/boolean/booleanRequirement'
import Schema from './schema'

export default class Boolean extends Schema {
  constructor() {
    super()

    super.addRequirement(BooleanRequirement)
  }
}
