// We only need to import the modules necessary for initial render
import App from 'components/App'
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import ModalLayout from '../layouts/ModalLayout/ModalLayout'
import LoginRoute from './Login'
// import SignupRoute from './Signup'
import DashboardRoute from './Secure/Dashboard'
import NotFound from './NotFound'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export default (store) => {
  const requireAuth = (nextState, replace, cb) => {
    const { session } = store.getState()
    if (!session.user) {
      replace('login')
    }
    cb()
  }

  const requirePublic = (nextState, replace, cb) => {
    const { session } = store.getState()
    if (session.user) {
      replace('/')
    }
    cb()
  }

  return ({
    path        : '/',
    component: App,
    childRoutes : [
      {
        component: CoreLayout,
        onEnter: requireAuth,
        indexRoute: DashboardRoute(store),
        childRoutes:[
          // DashboardRoute(store)
        ]
      },
      {
        component: ModalLayout,
        onEnter: requirePublic,
        childRoutes: [
          LoginRoute(store)// ,
          // SignupRoute(store)
        ]
      },
      {
        path: '*',
        indexRoute: NotFound,
        status: 404
      }
    ]
  })
}
