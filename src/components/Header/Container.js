import { connect } from 'react-redux'
import Component from './Component'
import { selectUser } from 'selectors/session'
import { logUserOut } from 'actions/session'

const mapDispatchToProps = {
  logUserOut
}

const mapStateToProps = (state) => ({
  user: selectUser(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
