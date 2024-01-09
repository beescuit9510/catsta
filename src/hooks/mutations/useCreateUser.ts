import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useMutation } from '@tanstack/react-query'
import { setUserDoc } from './common/setUserDoc'

type CreateUser = {
  email: string
  password: string
  username: string
  confirm: string
}

async function createUser({ email, password, username, confirm }: CreateUser) {
  if (!email) throw new Error('Email is required')
  if (!username) throw new Error('Username is required')
  if (!password) throw new Error('Password is required')
  if (username.includes(' '))
    throw new Error('Space is not allowed in Username')
  if (confirm !== password) throw new Error('Those passwords must match')

  return createUserWithEmailAndPassword(auth, email, password).then(
    ({ user }) => setUserDoc({ id: user.uid, displayName: user.displayName })
  )
}

export default function useCreateUser() {
  return useMutation({
    mutationFn: createUser,
  })
}
