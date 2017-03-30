import ErrorMessage from './Component'
import { shallow } from 'tests/utils'

describe('(Component) ErrorMessage', () => {
  let _component, _props

  beforeEach(() => {
    _props = {
      children: 'Error Text'
    }
    _component = shallow(ErrorMessage, _props)
  })

  it('Renders the error message', () => {
    expect(_component.text()).to.match(/Error Text/)
  })
})
