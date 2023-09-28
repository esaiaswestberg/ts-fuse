import f from './index'

const defaultSchema = f
  .String()
  .default('Hello World')
  .length(11)
  .regex(/^[a-zA-Z ]+$/)
console.log(defaultSchema.validate(undefined))
