import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import { User } from 'src/types/DataTypes'
import { api } from '../services/api'

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
  fetchUser?: () => Promise<void>
  signIn: (data: SignInData) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

// custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  const { bnb_access_token: accessToken } = parseCookies()

  useEffect(() => {
    // if there is a token, fetch the user
    if (accessToken) {
      fetchUser(accessToken)
    }
  }, [accessToken])

  // use callback to memoize the function and only call api if user changes
  const fetchUser = useCallback(
    async (accessToken: string) => {
      try {
        const response = await api.get('/api/v1/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
        setUser(response.data)
      } catch (error) {
        alert(error.message)
      }
    },
    [accessToken]
  )

  // chamada ao backend onde faz a authenticacao de um novo usuario e retorna suas credencias
  // hook para fazer o registro de um novo usuario
  // critografar a senha do usuario
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

        Router.push('/')
      }
    } catch (error) {
      alert(error.message)
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
        alert('Login realizado com sucesso!')
        Router.push('/')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  // chamada ao backend para fazer o logout
  async function signOut() {
    try {
      const { bnb_access_token: accessToken } = parseCookies()

      await api
        .post('/api/v1/oauth/revoke', {
          token: accessToken,
          client_secret: 't4yDDok6dgV9xRclKt-C3E5XXDV-hYHufvZfRFS0Tys',
          client_id: 'dqKz9O9OYVvshH7M4nsm_xV5szgQQDVNQWV8-WkCVTE',
        })
        .then(() => {
          destroyCookie(undefined, 'bnb_access_token')
          setUser(null)
          Router.push('/')
        })
        .catch(error => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      user,
    }),
    [isAuthenticated, user]
  )

  return (
    <AuthContext.Provider value={{ ...contextValue, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
