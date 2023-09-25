import String from './models/schemas/string'

const schema = new String().length(5)
console.log(schema.validate('Hello'))
