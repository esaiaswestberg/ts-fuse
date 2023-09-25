import f from './index'

const stringSchema = new f.String().length(5)
const result = stringSchema.validate('Helo')
if (result.success) {
  const value = result.value
  console.log('The validation was successful and the value is:', value)
} else {
  const errors = result.errors
  console.log('The validation was unsuccessful and the errors are:', errors)
}
