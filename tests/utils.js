import React from 'react'
import { shallow as enzymeShallow, mount as enzymeMount } from 'enzyme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import createStore from 'store/createStore'

const muiTheme = getMuiTheme()

export const shallow = (Component, props = {}) => {
  return enzymeShallow(React.createElement(Component, props), {
    context: { muiTheme, store: createStore() },
    childContextTypes: {
      muiTheme: React.PropTypes.object,
      store: React.PropTypes.object
    }
  })
}

export const mount = (Component, props = {}) => {
  return enzymeMount(React.createElement(Component, props), {
    context: { muiTheme, store: createStore() },
    childContextTypes: {
      muiTheme: React.PropTypes.object,
      store: React.PropTypes.object
    }
  })
}
