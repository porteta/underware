const project = require('../config/project.config')
require('babel-core/register')({
  plugins: project.compiler_babel.plugins,
  presets: project.compiler_babel.presets
})
require('babel-polyfill')

const server = require('../server/main')
const debug = require('debug')('app:bin:dev-server')
const _ = require('lodash')

_.merge(global, project.globals)

server.listen(project.server_port)
debug(`Server is now running at http://localhost:${project.server_port}.`)
