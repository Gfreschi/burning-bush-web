import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { recoverUserInfo, signInRequest } from "../services/auth";
import { api } from "../services/api";


type User = {
  name: string
  email: string
  avatar_url: string
}

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInData) => Promise<void>
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

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({
      email,
      password,
    })

    setCookie(undefined, 'bnb.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user)

    Router.push('/')
    console.log(user)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
