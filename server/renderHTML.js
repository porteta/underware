import React from 'react'
import { Provider } from 'react-redux'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import { renderToString } from 'react-dom/server'
import createStore from 'store/createStore'
import Styletron from 'styletron-server'
import { StyletronProvider } from 'styletron-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Routes from 'routes'
import fetchComponentData from 'utils/fetch-component-data'
import webpackConfig from '../config/webpack.config'

export default function renderHTML (req, res) {
  // set user agent for server side rendering
  global.navigator = global.navigator || {}
  global.navigator.userAgent = req.headers['user-agent'] || 'all'
  const history = createMemoryHistory(req.url)

  // Create a new Redux store instance
  const store = createStore()
  const routes = Routes(store)

  match({ routes, history }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err)
      return res.status(500).end('Internal server error')
    }
    if (redirectLocation && `/${redirectLocation.pathname}` !== req.url) {
      res.redirect(redirectLocation.pathname)
    }
    if (!renderProps) {
      return res.status(404).end('Not found')
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message))

    function renderView () {
      const styletron = new Styletron()
      // Render the component to a string
      const componentHTML = renderToString(
        <StyletronProvider styletron={styletron}>
          <MuiThemeProvider>
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          </MuiThemeProvider>
        </StyletronProvider>
      )
      const stylesForHead = styletron.getStylesheetsHtml()
      // Grab the initial state from our Redux store
      const preloadedState = store.getState()
      // Send the rendered page back to the client
      const HTML = res.locals.webpackStats ? `
      <!doctype html>
      <html>
        <head>
          <title>Redux Universal Example</title>
          ${stylesForHead}
        </head>
        <body>
          <div id="root">${componentHTML}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script src="${webpackConfig.output.publicPath}vendor.${res.locals.webpackStats.hash}.js"></script>
          <script src="${webpackConfig.output.publicPath}app.${res.locals.webpackStats.hash}.js"></script>
        </body>
      </html>
      ` : 'Webpack is still building'
      return HTML
    }
  })
}
