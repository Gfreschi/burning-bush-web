import React, { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import {
  signInRequest,
  signUpRequest,
  signOutRequest,
  getCurrentUser,
} from '../services/auth'
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

  useEffect(() => {
    const { 'bnb_access_token': token } = parseCookies()

    if (token) {
      getCurrentUser(token).then(response => {
        setUser(response.user)
      })
    }
  }, [])

  // chamada ao backend onde faz a authenticacao de um novo usuario e retorna suas credencias
  async function signUp({ email, password }: SignUpData) {
    const { token } = await signUpRequest({
      email,
      password,
    })

    setCookie(undefined, 'bnb_access_token', token.access_token, {
      maxAge: token.expires_in, // 2 hours
    })

    api.defaults.headers.Authorization = `Bearer ${token.access_token}`

    setUser(user)

    Router.push('/')
    console.log(user)
  }

  // chamada ao backend onde faz a authenticacao e retorna um usuario
  async function signIn({ email, password }: SignInData) {
    const { token, error } = await signInRequest({
      email,
      password,
    })

    // TODO: tratar erros
    if (!error) {
      return alert(error.message)
    }

    setCookie(undefined, 'bnb_access_token', token.access_token, {
      maxAge: token.expires_in, // 2 hours
    })

    api.defaults.headers.Authorization = `Bearer ${token.access_token}`

    setUser(user)

    Router.push('/')
    console.log(user)
  }

  async function signOut({ accessToken }: SignOutData) {
    const { response } = await signOutRequest({ accessToken })

    destroyCookie(undefined, 'bnb_access_token')

    setUser(null)

    Router.push('/')

    console.log('logout')
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
