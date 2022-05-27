import React, { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import { signOutRequest } from '../services/auth'
import { api } from '../services/api'

type User = {
  name: string
  email: string
  avatarUrl: string
}

type SignInData = {
  email: string
  password: string
}

type SignUpData = {
  email: string
  password: string
}

type SignOutData = {
  accessToken: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInData) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  signOut: (data: SignOutData) => Promise<void>
}

type Token = {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  createdAt: number
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  // toda vez que este componente for renderizado, vai executar
  useEffect(() => {
    // verifica se existe um token no cookie e o renomeia para accessToken
    const { bnb_access_token: accessToken } = parseCookies()

    if (accessToken) {
      try {
        api
          .get('/api/v1/users/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(response => {
            // console.log('autehnticated')
            setUser(response.data.user)
          })
      } catch (error) {
        return error.response
      }
    }
  }, [])

  // chamada ao backend onde faz a authenticacao de um novo usuario e retorna suas credencias
  // hook para fazer o registro de um novo usuario
  async function signUp({ email, password }: SignUpData) {
    try {
      const response = await api.post(
        '/api/v1/users',
        JSON.stringify({
          email: email,
          password: password,
          client_id: 'dqKz9O9OYVvshH7M4nsm_xV5szgQQDVNQWV8-WkCVTE',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response?.data.access_token) {
        setCookie(undefined, 'bnb_access_token', response.data.access_token, {
          maxAge: response.data.expires_in, // 2 hours
        })

        api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`

        setUser(response.data.access_token)

        Router.push('/')

        console.log(response)
      }
    } catch (error) {
      console.log(error.response) // response error data
      return error.response
    }
  }

  // chamada ao backend onde faz a authenticacao e retorna um usuario
  async function signIn({ email, password }: SignInData) {
    try {
      const response = await api.post(
        '/api/v1/oauth/token',
        JSON.stringify({
          email: email,
          password: password,
          grant_type: 'password',
          client_secret: 't4yDDok6dgV9xRclKt-C3E5XXDV-hYHufvZfRFS0Tys',
          client_id: 'dqKz9O9OYVvshH7M4nsm_xV5szgQQDVNQWV8-WkCVTE',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response?.data.access_token) {
        setCookie(undefined, 'bnb_access_token', response.data.access_token, {
          maxAge: response.data.expires_in, // 2 hours
        })

        api.defaults.headers.Authorization = `Bearer ${response.data.access_token}`

        setUser(response.data.access_token)

        Router.push('/')

        console.log(response)
      }
      return response
    } catch (error) {
      console.log(error.response) // response error data
      return error.response
    }
  }

  // chamada ao backend para fazer o logout
  async function signOut({ accessToken }: SignOutData) {
    const { response } = await signOutRequest({ accessToken })

    destroyCookie(undefined, 'bnb_access_token')

    setUser(null)

    Router.push('/')

    console.log(response)
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
