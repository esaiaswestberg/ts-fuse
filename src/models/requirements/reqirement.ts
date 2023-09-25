export default abstract class Requirement {
  public validate(value: any): boolean {
    throw new Error('A blank requirement cannot be validated!')
  }
}
