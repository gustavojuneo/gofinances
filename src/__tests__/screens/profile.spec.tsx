import React from 'react'
import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile'

describe('Profile', () => {
  it('should has user input name with correctly placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />)
    const inputName = getByPlaceholderText('Nome')

    expect(inputName).toBeTruthy()
  })
})
