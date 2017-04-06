import express from 'express'
import createDebugger from 'debug'
import webpack from 'webpack'
import webpackConfig from '../config/webpack.config'
import project from '../config/project.config'
import compress from 'compression'
import proxy from 'http-proxy-middleware'
import renderHTML from './renderHTML'
import injectTapEventPlugin from 'react-tap-event-plugin'

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

  app.use(renderHTML)

  module.exports = app
}
