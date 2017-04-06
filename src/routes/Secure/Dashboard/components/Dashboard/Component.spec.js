import React from 'react'
import Dashboard from './Component'
import { shallow } from 'enzyme'

describe('(Component) Dashboard', () => {
  let _component, _props

  beforeEach(() => {
    _props = {}
    _component = shallow(<Dashboard {..._props} />)
  })

  it('Renders a Title', () => {
    const title = _component.find('h2')
    expect(title).to.exist
    expect(title.text()).to.match(/Dashboard/)
  })
})
