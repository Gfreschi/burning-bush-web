import React, { createContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { recoverUserInfo, signInRequest, signUpRequest } from '../services/auth'
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

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInData) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
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
    const { 'bnb.token': token } = parseCookies()

    if (token) {
      recoverUserInfo().then(response => {
        setUser(response.user)
      })
    }
  }, [])

  // chamada ao backend onde faz a authenticacao de um novo usuario e retorna suas credencias
  async function signUp({ email, password }: SignUpData) {
    const { token, user } = await signUpRequest({
      email,
      password,
    })

    setCookie(undefined, 'bnb.token', token.access_token, {
      maxAge: token.expires_in, // 2 hours
    })

    api.defaults.headers.Authorization = `Bearer ${token.access_token}`

    setUser(user)

    Router.push('/')
    console.log(user)
  }

  // chamada ao backend onde faz a authenticacao e retorna um usuario
  async function signIn({ email, password }: SignInData) {
    const { token, user, error } = await signInRequest({
      email,
      password,
    })

    // TODO: tratar erros
    if (!error) {
      return alert(error.message)
    }

    setCookie(undefined, 'bnb.token', token.access_token, {
      maxAge: token.expires_in, // 2 hours
    })

    api.defaults.headers.Authorization = `Bearer ${token.access_token}`

    setUser(user)

    Router.push('/')
    console.log(user)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
