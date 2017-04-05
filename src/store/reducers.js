import { combineReducers } from 'redux'
import configReducer from 'reducers/config'
import locationReducer from './location'
import sessionReducer from './session'
import { reducer as formReducer } from 'redux-form'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    config: configReducer,
    location: locationReducer,
    session: sessionReducer,
    form: formReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
