import { Map, isImmutable } from 'immutable'
import { CONFIG_REQUEST, CONFIG_SUCCESS, CONFIG_FAILURE } from 'constants/config'

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONFIG_REQUEST]: (state) => state.set('isLoading', true),
  [CONFIG_SUCCESS]: (state, action) => {
    state = state.set('data', action.payload)
    state = state.set('isLoading', false)
    return state
  },
  [CONFIG_FAILURE]: (state) => state.set('isLoading', false)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({
  data: undefined,
  isLoading: false
})

export default function configReducer (state = initialState, action) {
  state = isImmutable(state) ? state : Map(state)
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
