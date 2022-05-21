import { parseCookies } from 'nookies'
import React from 'react'

import { AuthContext } from '../../contexts/AuthContext'

export default function SignOut() {
  const { signOut } = React.useContext(AuthContext)

  // TODO: refactor this
  const payload = parseCookies()
  try {
    console.log(payload)
    signOut(payload)
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
