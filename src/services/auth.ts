// responsavel por chamar o serviço de autenticação de api

import { api } from './api'

type SignInRequestData = {
  email: string
  password: string
}

type SignUpRequestData = {
  email: string
  password: string
}

type SignOutRequestData = {
  accessToken: string
}

type Token = {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  createdAt: number
}

export async function signUpRequest(data: SignUpRequestData) {
  const response = await api.post('/api/v1/users', {
    email: data.email,
    password: data.password,
    client_id: 'secret',
  })

  return {
    token: {
      access_token: response.data.access_token,
      use_refresh_token: response.data.use_refresh_token,
      expires_in: response.data.expires_in,
      token_type: response.data.token_type,
      created_at: response.data.created_at,
    },
    error: {
      status: response.data.status,
      message: response.data.statusText,
    },
  }
}

export async function signInRequest(data: SignInRequestData) {
  try {
    const response = await api.post(
      '/api/v1/oauth/token',
      JSON.stringify({
        email: data.email,
        password: data.password,
        grant_type: 'password',
        client_secret: 'secret',
        client_id: 'secret',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response
  } catch (error) {
    return error.response
  }
}

export async function signOutRequest(data: SignOutRequestData) {
  const response = await api.post('/api/v1/oauth/revoke', {
    token: data,
    client_secret: 'secret',
    client_id: 'secret',
  })

  return { response }
}

// receive token and return user data
export async function getCurrentUser(accessToken: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const user = await api.get('/api/v1/users/me', config)

  return { user }
}
