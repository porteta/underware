import React from 'react'
import ErrorMessage from './Component'
import { shallow } from 'enzyme'
import Styletron from 'styletron-client'

describe('(Component) ErrorMessage', () => {
  let _component, _props

  beforeEach(() => {
    _props = {
      children: 'Error Text'
    }
    _component = shallow(<ErrorMessage {..._props} />, {
      context: { styletron: new Styletron() },
      childContextTypes: {
        styletron: React.PropTypes.object
      }
    })
  })

  it('Renders the error message', () => {
    expect(_component.text()).to.match(/Error Text/)
  })
})
