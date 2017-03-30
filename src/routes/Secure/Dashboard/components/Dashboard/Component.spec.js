import Dashboard from './Component'
import { mount } from 'tests/utils'

describe('(Component) Dashboard', () => {
  let _component, _props

  beforeEach(() => {
    _props = {}
    _component = mount(Dashboard, _props)
  })

  it('Renders a Title', () => {
    const title = _component.find('h2')
    expect(title).to.exist
    expect(title.text()).to.match(/Dashboard/)
  })
})
