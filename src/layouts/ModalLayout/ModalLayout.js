import React from 'react'

export const ModalLayout = ({ children }) => (
  <div className='container text-center'>
    <div className='modal-layout__viewport'>
      {children}
    </div>
  </div>
)

ModalLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default ModalLayout
