import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useMutation } from '@tanstack/react-query'
import { setUserDoc } from './common/setUserDoc'
import { useNavigate } from 'react-router-dom'

type CreateUser = {
  email: string
  password: string
  username: string
  confirm: string
}

async function createUser({ email, password, username, confirm }: CreateUser) {
  if (!email.trim()) throw new Error('Email is required')
  if (!username.trim()) throw new Error('Username is required')
  if (!password.trim()) throw new Error('Password is required')
  if (confirm !== password) throw new Error('Those passwords must match')

  return createUserWithEmailAndPassword(auth, email, password).then(
    ({ user }) => setUserDoc({ id: user.uid, displayName: username })
  )
}

export default function useCreateUser() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      navigate('/')
    },
  })
}
