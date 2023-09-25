import f from './index'

const stringSchema = new f.String().length(5)
console.log(stringSchema.validate('Helo'))
