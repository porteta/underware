import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, createMemoryHistory, browserHistory } from 'react-router'
import createStore from 'store/createStore'
import Styletron from 'styletron-client'
import { StyletronProvider } from 'styletron-react'
// import AppContainer from './components/App'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { polyfill as promisePolyfill } from 'es6-promise'
import 'isomorphic-fetch'

const styleElements = document.getElementsByClassName('_styletron_hydrate_')

promisePolyfill()

// ========================================================
// Store Instantiation
// ========================================================

const initialState = window.__PRELOADED_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('routes/index').default(store)
  const history = browserHistory || createMemoryHistory()
  const styletron = new Styletron(styleElements)
  ReactDOM.render(
    <StyletronProvider styletron={styletron}>
      <MuiThemeProvider>
        <Provider store={store}>
          <Router history={history} children={routes} />
        </Provider>
      </MuiThemeProvider>
    </StyletronProvider>,
    MOUNT_NODE
  )
}

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
