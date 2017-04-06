import React, { PureComponent, PropTypes } from 'react'
import { createMemoryHistory, browserHistory } from 'react-router'
import { Helmet } from 'react-helmet'
import { fetchConfig } from 'actions/config'
import { fetchUser } from 'actions/session'

const history = browserHistory || createMemoryHistory()

class App extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.node
  }

  componentWillReceiveProps (nextProps) {
    const { user } = this.props
    if (nextProps.user !== user) {
      nextProps.user ? history.replace('/') : history.replace('/login')
    }
  }

  static needs = [
    fetchConfig,
    fetchUser
  ];

  render () {
    return (
      <div style={{ height: '100%' }}>
        <Helmet>
          <title>Underware</title>
        </Helmet>
        {this.props.children}
      </div>
    )
  }
}

export default App
