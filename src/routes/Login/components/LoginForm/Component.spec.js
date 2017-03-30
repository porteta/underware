import LoginForm from './Component'
import { mount } from 'tests/utils'
import { logUserIn } from 'store/session'

describe('(Component) LoginForm', () => {
  let _component, _props

  beforeEach(() => {
    _props = {
      user: undefined,
      logUserIn
    }
    _component = mount(LoginForm, _props)
  })

  it('Renders a <form />', () => {
    expect(_component.find('form')).to.exist
  })
})
