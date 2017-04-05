import { CONFIG_REQUEST, CONFIG_SUCCESS, CONFIG_FAILURE } from 'constants/config'

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONFIG_REQUEST]: (state) => ({ ...state, isLoading: true }),
  [CONFIG_SUCCESS]: (state, action) => ({ ...state, data: action.payload, isLoading: false }),
  [CONFIG_FAILURE]: (state) => ({ ...state, isLoading: false })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: undefined,
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
