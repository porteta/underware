import { connect } from 'react-redux'
import { logUserIn } from 'actions/session'
import { selectUser } from 'selectors/session'

import LoginForm from './Component'

const mapDispatchToProps = {
  onSubmit: logUserIn
}

const mapStateToProps = state => ({
  user: selectUser(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
