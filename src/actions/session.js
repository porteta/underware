import { SubmissionError } from 'redux-form'
import { fetchUtils } from 'utils'
import { API_URL } from 'constants'
import { LOG_USER_IN, LOG_USER_OUT, CURRENT_USER_REQUEST } from 'constants/session'

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const logUserIn = (credentials) => {
  return (dispatch) => {
    return fetch(`${API_URL}/login`, fetchUtils.config({
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
    return fetch(`${API_URL}/logout`, fetchUtils.config())
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
    return fetch(`${API_URL}/users/current`, fetchUtils.config())
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
