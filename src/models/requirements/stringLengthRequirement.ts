import Requirement from './reqirement'

export default class StringLengthRequirement extends Requirement {
  private length: number | undefined
  private min: number | undefined
  private max: number | undefined

  public setLength(length: number) {
    this.length = length
  }

  public setMin(min: number) {
    this.min = min
  }

  public setMax(max: number) {
    this.max = max
  }

  public validate(value: string) {
    if (this.length && value.length !== this.length) return false
    if (this.min && value.length < this.min) return false
    if (this.max && value.length > this.max) return false

    return true
  }
}
