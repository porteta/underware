import NotFoundRoute from 'routes/NotFound'

describe('(Route) Index', () => {
  let _route

  beforeEach(() => {
    _route = NotFoundRoute
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should define `component`', () => {
    expect(_route).to.have.property('component')
  })
})
