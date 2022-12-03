import { useAuthContext } from 'src/contexts/AuthContext'

export default function SignOut() {
  const { signOut } = useAuthContext()
  try {
    signOut()
  } catch (error) {
    console.log(error)
  }
}
