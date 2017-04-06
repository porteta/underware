import { connect } from 'react-redux'
import { logUserIn } from 'actions/session'
import { selectUser } from 'selectors/session'
import { loginForm as validate } from 'validations'
import { reduxForm } from 'redux-form'

import LoginForm from './Component'

const mapDispatchToProps = {
  onSubmit: logUserIn
}

const mapStateToProps = state => ({
  user: selectUser(state)
})

const reduxLoginForm = reduxForm({
  form: 'login',
  validate
})(LoginForm)

export default connect(mapStateToProps, mapDispatchToProps)(reduxLoginForm)
