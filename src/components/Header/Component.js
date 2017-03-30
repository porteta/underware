import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import { IndexLink } from 'react-router'
// import styles from './styles.css'

class Header extends Component {
  static propTypes = {
    logUserOut : PropTypes.func,
    user : PropTypes.object
  }

  render () {
    const { logUserOut, user } = this.props
    return (
      <div>
        <h1>React Redux Starter Kit</h1>
        <IndexLink to='/' activeClassName='routeActive'>
          Home
        </IndexLink>
        {' · '}
        {user ? <FlatButton label='Logout' onClick={logUserOut} /> : ''}
      </div>
    )
  }
}

export default Header
