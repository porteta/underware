import express from 'express'
import createDebugger from 'debug'
import webpack from 'webpack'
import webpackConfig from '../config/webpack.config'
import project from '../config/project.config'
import compress from 'compression'
import proxy from 'http-proxy-middleware'
import React from 'react'
import { Provider } from 'react-redux'
import { match, RouterContext, createMemoryHistory } from 'react-router'
import { renderToString } from 'react-dom/server'
import createStore from 'store/createStore'
import Styletron from 'styletron-server'
import { StyletronProvider } from 'styletron-react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Routes from 'routes'
import fetchComponentData from 'utils/fetch-component-data'
import { polyfill as promisePolyfill } from 'es6-promise'
import 'isomorphic-fetch'

promisePolyfill()

injectTapEventPlugin()

const app = express()
const debug = createDebugger('app:server')

// Apply gzip compression
app.use(compress())

// Proxy API requests
app.use('/api', proxy({
  target: 'http://your-api-here',
  changeOrigin: true
}))

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : project.paths.src(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    stats       : project.compiler_stats,
    serverSideRender: true
  }))

  app.use(require('webpack-hot-middleware')(compiler, {
    path: `${webpackConfig.output.publicPath}__webpack_hmr`
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()))

  app.use(function handleRender (req, res) {
    // set user agent for server side rendering
    global.navigator = global.navigator || {}
    global.navigator.userAgent = req.headers['user-agent'] || 'all'
    const history = createMemoryHistory(req.url)
    // const location = history.location
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
        // development render
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
  })

  module.exports = app
}
