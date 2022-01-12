import React from 'react'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'

import { Register } from '.'
import theme from '../../global/styles/theme'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

jest.mock('@react-navigation/core', () => ({ useNavigation: () => jest.fn() }))
jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({ user: { id: 'any-id' } }),
}))

describe('Register Screen', () => {
  it('should be open category modal when user click on button', () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers })
    const categoryModal = getByTestId('modal-category')

    expect(categoryModal.props.visible).toBeFalsy()
  })
})
