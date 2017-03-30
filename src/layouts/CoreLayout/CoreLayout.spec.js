import React from 'react'
import Header from 'components/Header'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import { mount } from 'tests/utils'

describe('(Layout) Core', function () {
  let _component
  let _props
  let _child

  beforeEach(function () {
    _child = <h1 className='child'>Child</h1>
    _props = {
      children : _child
    }

    _component = mount(CoreLayout, _props)
  })

  it('Should render <Header />.', function () {
    expect(_component.contains(
      <Header />
    )).to.be.true
  })
})
