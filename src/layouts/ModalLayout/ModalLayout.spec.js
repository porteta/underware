import React from 'react'
import Header from 'components/Header'
import ModalLayout from 'layouts/ModalLayout/ModalLayout'
import { shallow } from 'enzyme'

describe('(Layout) Modal', function () {
  let _component
  let _props
  let _child

  beforeEach(function () {
    _child = <h1 className='child'>Child</h1>
    _props = {
      children : _child
    }

    _component = shallow(<ModalLayout {..._props} />)
  })

  it('Should not render <Header />.', function () {
    expect(_component.contains(
      <Header />
    )).to.be.false
  })
})
