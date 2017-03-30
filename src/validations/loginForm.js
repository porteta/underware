import { validate } from 'utils'

export default values => ({
  email: validate.required(values.email) || validate.email(values.email),
  password: validate.required(values.password)
})
