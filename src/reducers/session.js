import { LOG_USER_IN, LOG_USER_OUT, CURRENT_USER_REQUEST } from 'constants/session'

// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOG_USER_IN]: (state, action) => ({ ...state, user: action.payload, isLoading: false, initialized: true }),
  [LOG_USER_OUT]: (state) => ({ ...state, user: null, isLoading: false, initialized: true }),
  [CURRENT_USER_REQUEST]: (state) => ({ ...state, isLoading: true })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  user: undefined,
  isLoading: false,
  initialized: false
}

export default function sessionReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
