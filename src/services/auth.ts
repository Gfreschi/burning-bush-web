// responsavel por chamar o serviço de autenticação de api

type SignInRequestData = {
  email: string
  password: string
}

export async function signInRequest(data: SignInRequestData) {
  // pesquisar payload
  return {
    token: 'abc123abc',
    user: {
      name: 'Gabriel Freschi - ADMIN',
      email: 'admin@admin.com',
      avatarUrl: 'https://github.com/Gfreschi.png',
    },
  }
}
// recebe o token e retorna as infos do usuario da api
export async function recoverUserInfo() {
  return {
    user: {
      name: 'Gabriel Freschi - ADMIN',
      email: 'admin@admin.com',
      avatarUrl: 'https://github.com/Gfreschi.png',
    },
  }
}
