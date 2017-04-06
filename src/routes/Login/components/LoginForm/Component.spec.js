import React from 'react'
import LoginForm from './Component'
import { shallow } from 'enzyme'
import { logUserIn } from 'actions/session'

describe('(Component) LoginForm', () => {
  let _component, _props

  beforeEach(() => {
    _props = {
      user: undefined,
      logUserIn
    }
    _component = shallow(<LoginForm {..._props} />)
  })

  it('Renders a <form />', () => {
    expect(_component.find('form')).to.exist
  })
})
