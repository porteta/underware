import IndexRoute from 'routes'
import createStore from 'store/createStore'

describe('(Route) Index', () => {
  let _route

  beforeEach(() => {
    _route = IndexRoute(createStore())
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `/`', () => {
    expect(_route.path).to.equal('/')
  })
})
