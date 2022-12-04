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
    client_id: 'KrfT7OpXi2q5aUgcZwYVn2eLgA_viqCTU5DVnD-WDFk',
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
  // pesquisar payload
  try {
    const response = await api.post(
      '/api/v1/oauth/token',
      JSON.stringify({
        email: data.email,
        password: data.password,
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
    // console.log(response)
    return response
  } catch (error) {
    // console.log(error.response) // response error data
    return error.response
  }
}

export async function signOutRequest(data: SignOutRequestData) {
  const response = await api.post('/api/v1/oauth/revoke', {
    token: data,
    client_secret: 'BCb-ygdynnqzU1uOF5z38ivz-hfQYvpDxXmgdRH4H5Q',
    client_id: 'KrfT7OpXi2q5aUgcZwYVn2eLgA_viqCTU5DVnD-WDFk',
  })

  return { response }
}
// recebe o token e retorna as infos do usuario da api
export async function getCurrentUser(accessToken: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const user = await api.get('/api/v1/users/me', config)

  return { user }

  // best way to get user info
  // return api
  //   .get('/v1/users/me', config)
  //   .then((response: any) => {
  //     return response.data
  //   })
  //   .catch((error: any) => {
  //     return error.response.data
  //   })
}
