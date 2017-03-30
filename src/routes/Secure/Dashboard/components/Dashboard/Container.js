import { connect } from 'react-redux'

import Dashboard from './Component'

const mapDispatchToProps = {
  // increment : () => increment(1),
  // doubleAsync
}

const mapStateToProps = () => ({
  // counter : state.counter
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
