import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function PrivateRoute({ children }: any) {
  const accessToken = false
  const loading = false
  const router = useRouter()

  if (accessToken) {
    return children
  } else if (loading) {
    return <p>Loading...</p>
  } else if (!accessToken && !loading) {
    return <Link href="sessions/login">Login</Link>
  } else {
    return <p>Something went wrong</p>
  }
}
