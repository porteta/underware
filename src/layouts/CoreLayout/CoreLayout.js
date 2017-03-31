import React from 'react'
import Header from 'components/Header'

export const CoreLayout = (props) => {
  return (
    <div className='container text-center'>
      <div className='viewport'>
        <Header />
        {props.children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
