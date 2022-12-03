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
import { useSnackbar } from 'notistack'

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
  const { enqueueSnackbar } = useSnackbar()

  const { bnb_access_token: accessToken } = parseCookies()

  const errorSignUp = () => {
    enqueueSnackbar('Erro ao criar conta', {
      variant: 'error',
    })
  }

  const sucessSignUp = () => {
    enqueueSnackbar('Conta criada com sucesso', {
      variant: 'success',
    })
  }

  const errorSignIn = () => {
    enqueueSnackbar('Erro ao fazer login', {
      variant: 'error',
    })
  }

  const sucessSignIn = () => {
    enqueueSnackbar('Login realizado com sucesso', {
      variant: 'success',
    })
  }

  const errorSignOut = () => {
    enqueueSnackbar('Erro ao fazer logout', {
      variant: 'error',
    })
  }

  const sucessSignOut = () => {
    enqueueSnackbar('Logout realizado com sucesso', {
      variant: 'success',
    })
  }

  const otherError = () => {
    enqueueSnackbar('Erro desconhecido', {
      variant: 'error',
    })
  }

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
        otherError()
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
          client_id: 'KrfT7OpXi2q5aUgcZwYVn2eLgA_viqCTU5DVnD-WDFk',
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
        sucessSignUp()
        Router.push('/')
      }
    } catch (error) {
      errorSignUp()
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
          client_secret: 'BCb-ygdynnqzU1uOF5z38ivz-hfQYvpDxXmgdRH4H5Q',
          client_id: 'KrfT7OpXi2q5aUgcZwYVn2eLgA_viqCTU5DVnD-WDFk',
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
        sucessSignIn()
        Router.push('/')
      }
    } catch (error) {
      errorSignIn()
    }
  }

  // chamada ao backend para fazer o logout
  async function signOut() {
    try {
      const { bnb_access_token: accessToken } = parseCookies()

      const response = await api.post('/api/v1/oauth/revoke', {
        token: accessToken,
        client_secret: 'BCb-ygdynnqzU1uOF5z38ivz-hfQYvpDxXmgdRH4H5Q',
        client_id: 'KrfT7OpXi2q5aUgcZwYVn2eLgA_viqCTU5DVnD-WDFk',
      })

      if (response?.status === 200) {
        destroyCookie(undefined, 'bnb_access_token')
        setUser(null)
        // sucessSignOut()
        Router.push('/')
      }
    } catch (error) {
      errorSignOut()
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
