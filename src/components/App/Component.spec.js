import React from 'react'
import createStore from 'store/createStore'
import routes from 'routes'
import App from './Component'
import { shallow } from 'enzyme'

describe('(Component) App', () => {
  let _component, _props

  beforeEach(() => {
    const store = createStore()
    _props = {
      user: undefined,
      routes: routes(store),
      store
    }
  })

  beforeEach(() => {
    _component = shallow(
      <App {..._props}>
        <h1>Hi</h1>
      </App>
    )
  })

  it('Renders Children', () => {
    const child = _component.find('h1')
    expect(child).to.exist
  })
})
