import Requirement from '../reqirement'

export default class StringRequirement extends Requirement {
  public validate(value: any) {
    return typeof value === 'string'
  }
}
