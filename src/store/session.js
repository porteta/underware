import { apiUrl } from 'config'
// import axios from 'axios'
// import _ from 'lodash'
import { SubmissionError } from 'redux-form'
import { createSelector } from 'reselect'
import { fetchUtils } from 'utils'

// ------------------------------------
// Constants
// ------------------------------------
export const LOG_USER_IN = 'LOG_USER_IN'
export const LOG_USER_OUT = 'LOG_USER_OUT'
export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const logUserIn = (credentials) => {
  return (dispatch) => {
    return fetch(`${apiUrl}/login`, fetchUtils.config({
      method: 'POST',
      body: JSON.stringify(credentials)
    })).then(fetchUtils.handleJSONResponse)
      .then(user => {
        return dispatch({
          type    : LOG_USER_IN,
          payload : user
        })
      }).catch(() => {
        throw new SubmissionError({ _error: 'Login failed! Check your credentials and try again.' })
      })
  }
}

export const logUserOut = () => {
  return (dispatch) => {
    return fetch(`${apiUrl}/logout`, fetchUtils.config())
      .then(fetchUtils.handleJSONResponse)
      .then(() => {
        dispatch({
          type    : LOG_USER_OUT
        })
      })
  }
}

export const fetchUser = () => {
  return (dispatch) => {
    dispatch({
      type    : CURRENT_USER_REQUEST
    })
    return fetch(`${apiUrl}/users/current`, fetchUtils.config())
      .then(fetchUtils.handleJSONResponse)
      .then(user => {
        dispatch({
          type    : LOG_USER_IN,
          payload : user
        })
      }).catch(() => {
        dispatch({
          type    : LOG_USER_OUT
        })
      })
  }
}

export const actions = {
  logUserIn,
  logUserOut
}

// ------------------------------------
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

// ------------------------------------
// Selectors
// ------------------------------------

export const selectSession = state => state.session

export const selectUser = createSelector(selectSession, (session) => session.user)
