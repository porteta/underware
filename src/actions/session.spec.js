import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { API_URL } from 'constants'
import { user } from 'tests/mock-data'
import {
  CURRENT_USER_REQUEST,
  LOG_USER_IN,
  LOG_USER_OUT } from 'constants/session'
import {
  fetchUser,
  logUserIn,
  logUserOut } from 'actions/session'

describe('(Store) Config', () => {
  const middlewares = [ thunk ]
  const createMockStore = configureMockStore(middlewares)

  describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('should create LOG_USER_IN action when logging in', () => {
      fetchMock.post(`${API_URL}/login`, user)

      const expectedActions = [
        { type: LOG_USER_IN, payload: user }
      ]
      const store = createMockStore({})

      return store.dispatch(logUserIn())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })

    it('should create LOG_USER_IN when fetching user has been done', () => {
      fetchMock.get(`${API_URL}/users/current`, user)

      const expectedActions = [
        { type: CURRENT_USER_REQUEST },
        { type: LOG_USER_IN, payload: user }
      ]
      const store = createMockStore({})

      return store.dispatch(fetchUser())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })

    it('should create LOG_USER_OUT action when logging out', () => {
      fetchMock.get(`${API_URL}/logout`, { success: true })

      const expectedActions = [
        { type: LOG_USER_OUT }
      ]
      const store = createMockStore({})

      return store.dispatch(logUserOut())
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })
})
