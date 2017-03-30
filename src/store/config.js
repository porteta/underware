import { apiUrl } from 'config'
import { fetchUtils } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------

export const CONFIG_REQUEST = 'CONFIG_REQUEST'
export const CONFIG_SUCCESS = 'CONFIG_SUCCESS'
export const CONFIG_FAILURE = 'CONFIG_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const fetchConfig = () => {
  return (dispatch) => {
    dispatch({
      type: CONFIG_REQUEST
    })
    return fetch(`${apiUrl}/config`, fetchUtils.config())
      .then(fetchUtils.handleJSONResponse)
      .then(config => {
        dispatch({
          type    : CONFIG_SUCCESS,
          payload : config
        })
      }).catch(() => {
        dispatch({
          type    : CONFIG_FAILURE
        })
      })
  }
}

export const actions = {
  fetchConfig
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONFIG_REQUEST]: (state) => ({ ...state, isLoading: true }),
  [CONFIG_SUCCESS]: (state, action) => ({ ...state, data: action.payload, isLoading: false, initialized: true }),
  [CONFIG_FAILURE]: (state) => ({ ...state, isLoading: false })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: undefined,
  initialized: false,
  isLoading: false
}

export default function configReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

// ------------------------------------
// Selectors
// ------------------------------------

export const selectConfig = state => state.config
