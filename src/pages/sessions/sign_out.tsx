import React from 'react'

import { AuthContext } from '../../contexts/AuthContext'

export default function SignOut() {
  const { signOut } = React.useContext(AuthContext)

  // TODO: refactor this
  try {
    signOut()
    alert('Signed out')
  } catch (error) {
    console.log(error)
  }

  return <></>
}
