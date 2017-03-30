import DashboardRoute from 'routes/Secure/Dashboard'

describe('(Route) Dashboard', () => {
  let _route

  beforeEach(() => {
    _route = DashboardRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })
})
