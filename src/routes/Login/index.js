export default () => ({
  path : 'login',
  component: require('./components/LoginForm').default
  // /*  Async getComponent is only invoked when route matches   */
  // getComponent (nextState, cb) {
  //   /*  Webpack - use 'require.ensure' to create a split point
  //       and embed an async module loader (jsonp) when bundling   */
  //   require.ensure([], (require) => {
  //     /*  Webpack - use require callback to define
  //         dependencies for bundling   */
  //     const LoginForm = require('./components/LoginForm').default
  //
  //     /*  Return getComponent   */
  //     cb(null, LoginForm)
  //
  //   /* Webpack named bundle   */
  //   }, 'login')
  // }
})
