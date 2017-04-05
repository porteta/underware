import _ from 'lodash'

export default {
  config,
  handleJSONResponse
}

function handleJSONResponse (res) {
  return new Promise((resolve, reject) => {
    if (res.ok) {
      resolve(res.json())
    } else {
      res.json().then(err => {
        if (process.env !== 'production') {
          console.error(err)
        }
        reject(err)
      })
    }
  })
}

function config (config = {}) {
  const defaultConfig = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  return _.extend(defaultConfig, config)
}
