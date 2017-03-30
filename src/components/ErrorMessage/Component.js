import React from 'react'
// import styles from './styles.css'

export const ErrorMessage = (props) => (
  <div>
    {props.children}
  </div>
)

ErrorMessage.propTypes = {
  children: React.PropTypes.node
}

export default ErrorMessage
