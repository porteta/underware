import createStore from 'store/createStore'
import routes from 'routes'
import App from './Component'
import { mount } from 'tests/utils'

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
    _component = mount(App, _props)
  })

  xit('Contains a Router', () => {
    const router = _component.find('Router')
    expect(router).to.exist
  })
})
