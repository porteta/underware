export default {
  email,
  required
}

function email (value, invalidMessage = 'Invalid Email') {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return invalidMessage
  }
  return undefined
}

function required (value, invalidMessage = 'Required') {
  return value == null ? invalidMessage : undefined
}
