import { parseCookies } from 'nookies'
import React from 'react'

import { AuthContext } from '../../contexts/AuthContext'

export default function SignOut() {
  const { signOut } = React.useContext(AuthContext)

  // TODO: refactor this
  const { 'bnb_accces_token': accessToken } = parseCookies()
  try {
    console.log(accessToken)
    signOut(accessToken)
  } catch (e) {
    console.log(e)
  }

  return (
    <div>
      <main>
        <h1>Sign Out</h1>
      </main>
    </div>
  )
}
