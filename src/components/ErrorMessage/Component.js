import React from 'react'
import { styled } from 'styletron-react'

export const ErrorMessage = styled('div', () => ({
  color: 'red'
}))

ErrorMessage.propTypes = {
  children: React.PropTypes.node
}

export default ErrorMessage
