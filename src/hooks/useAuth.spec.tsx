import React from 'react'
import { mocked } from 'ts-jest/utils'
import { renderHook, act } from '@testing-library/react-hooks'
import { logInAsync } from 'expo-google-app-auth'

import { AuthProvider } from '../contexts/AuthContext'
import { useAuth } from './useAuth'

const Providers: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
)

jest.mock('expo-google-app-auth')

jest.mock('expo-apple-authentication', () => {
  return {
    signInAsync: () => ({
      fullName: {
        givenName: 'Foo',
      },
      email: 'foo@jest.test.com',
    }),
    AppleAuthenticationScope: {
      FULL_NAME: 0,
      EMAIL: 1,
    },
  }
})

type User = {
  id: string
  email: string
  name: string
  photo?: string
}

describe('Auth Hook', () => {
  const expectHasUser = (user: User) => {
    expect(user).toHaveProperty('id')
    expect(user.name).toBe('Foo')
    expect(user.email).toBe('foo@jest.test.com')
  }

  it('should be able to sign in with existent Google account', async () => {
    const googleMocked = mocked(logInAsync as any)
    googleMocked.mockReturnValueOnce({
      type: 'success',
      user: {
        id: 'any_user',
        email: 'foo@jest.test.com',
        name: 'Foo',
        photo: 'foo.png',
      },
    })
    const { result } = renderHook(() => useAuth(), { wrapper: Providers })

    await act(() => result.current.signInWithGoogle())
    expectHasUser(result.current.user)
  })

  it('should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(logInAsync as any)
    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    })
    const { result } = renderHook(() => useAuth(), { wrapper: Providers })

    await act(() => result.current.signInWithGoogle())
    expect(result.current.user).not.toHaveProperty('id')
  })

  it('should be able to sign in with existent Apple account', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: Providers })

    await act(() => result.current.signInWithApple())
    expectHasUser(result.current.user)
  })
})
