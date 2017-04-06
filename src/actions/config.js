import { fetchUtils } from 'utils'
import { API_URL } from 'constants'
import { CONFIG_REQUEST, CONFIG_SUCCESS, CONFIG_FAILURE } from 'constants/config'

export const fetchConfig = () => {
  return (dispatch) => {
    dispatch({
      type: CONFIG_REQUEST
    })
    return fetch(`${API_URL}/config`, fetchUtils.config())
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
