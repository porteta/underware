import React from 'react'
import Header from './Component'
import FlatButton from 'material-ui/FlatButton'
import { shallow } from 'enzyme'
import { user } from 'tests/mock-data'

describe('(Component) Header', () => {
  let _component
  const logUserOut = () => {}

  beforeEach(() => {
    _component = shallow(<Header user={user} logUserOut={logUserOut} />)
  })

  it('Renders a welcome message', () => {
    const welcome = _component.find('h1')
    expect(welcome).to.exist
    expect(welcome.text()).to.match(/React Redux Starter Kit/)
  })

  describe('User actions...', () => {
    it('Should render a Logout button if user is preset', () => {
      expect(_component.contains(
        <FlatButton label='Logout' onClick={logUserOut} />
      )).to.be.true
    })
  })
})
