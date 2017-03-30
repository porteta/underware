import { connect } from 'react-redux'
import { logUserIn, selectUser } from 'store/session'

import LoginForm from './Component'

const mapDispatchToProps = {
  onSubmit: logUserIn
}

const mapStateToProps = state => ({
  user: selectUser(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
