import React from 'react'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'

import { Input } from '.'
import theme from '../../../global/styles/theme'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe('Input Component', () => {
  it('must have border color when active', () => {
    const inputTestId = 'input-email'
    const { getByTestId } = render(
      <Input
        testID={inputTestId}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        active
      />,
      {
        wrapper: Providers,
      },
    )
    const inputComponent = getByTestId(inputTestId)

    expect(inputComponent.props.style[0].borderColor).toEqual(
      theme.colors.attention,
    )
    expect(inputComponent.props.style[0].borderWidth).toEqual(3)
  })
})
