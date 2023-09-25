import Requirement from '../requirements/reqirement'

export default abstract class Schema {
  private requirements: Requirement[] = []

  public validate(value: any): boolean {
    const results = this.requirements.map((requirement) => requirement.validate(value))
    return results.every((result) => result === true)
  }

  protected createReqirement<T extends Requirement>(requirementClass: new () => T): T {
    let requirement = this.getRequirement(requirementClass)
    if (!requirement) {
      requirement = new requirementClass()
      this.requirements.push(requirement)
    }

    return requirement
  }

  private getRequirement<T extends Requirement>(requirementClass: new () => T): T | undefined {
    return this.requirements.find((requirement) => requirement instanceof requirementClass) as T | undefined
  }
}
