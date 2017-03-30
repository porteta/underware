import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import { loginForm as validate } from 'validations'
import ErrorMessage from 'components/ErrorMessage'

class LoginForm extends Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    error: React.PropTypes.string,
    user: React.PropTypes.object
  }

  render () {
    const { handleSubmit, error } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <Field
            name='email'
            type='email'
            component={TextField}
            hintText='Email'
          />
        </div>
        <div>
          <Field
            name='password'
            type='password'
            component={TextField}
            hintText='Password'
          />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <RaisedButton type='submit' label='sign in' />
      </form>
    )
  }
}

export default reduxForm({
  form: 'login',
  validate
})(LoginForm)
