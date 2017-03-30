import fetchUtils from './fetch'

describe('(Utils) fetch', () => {
  it('Should extend the config object', () => {
    const config = fetchUtils.config({
      method: 'POST'
    })
    expect(typeof config).to.equal('object')
    expect(config.credentials).to.equal('include')
    expect(config.method).to.equal('POST')
  })
})
