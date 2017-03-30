import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { apiUrl } from 'config'
import { CONFIG_REQUEST, CONFIG_SUCCESS, fetchConfig } from './config'

describe('(Store) Config', () => {
  const middlewares = [ thunk ]
  const createMockStore = configureMockStore(middlewares)

  describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('should create CONFIG_SUCCESS when fetching config has been done', () => {
      fetchMock.get(`${apiUrl}/config`, { configKey: 'configValue' })

      const expectedActions = [
        { type: CONFIG_REQUEST },
        { type: CONFIG_SUCCESS, payload: { configKey: 'configValue' } }
      ]
      const store = createMockStore({})

      return store.dispatch(fetchConfig())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })
})
