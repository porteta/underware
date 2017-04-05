import { Map, isImmutable } from 'immutable'
import { LOG_USER_IN, LOG_USER_OUT, CURRENT_USER_REQUEST } from 'constants/session'

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOG_USER_IN]: (state, action) => {
    state = state.set('user', action.payload)
    state = state.set('isLoading', false)
    return state
  },
  [LOG_USER_OUT]: (state) => {
    state = state.set('user', null)
    state = state.set('isLoading', false)
    return state
  },
  [CURRENT_USER_REQUEST]: (state) => state.set('isLoading', true)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({
  user: undefined,
  isLoading: false
})

export default function sessionReducer (state = initialState, action) {
  state = isImmutable(state) ? state : Map(state)
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
