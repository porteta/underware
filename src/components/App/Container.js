import { connect } from 'react-redux'
import { selectUser } from 'store/session'
import App from './Component'

const mapDispatchToProps = {}

const mapStateToProps = (state) => {
  return {
    user: selectUser(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
