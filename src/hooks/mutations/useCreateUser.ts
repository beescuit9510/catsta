import { AuthError, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '../../utils/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useMutation } from '@tanstack/react-query'

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

  // TODO: extract shared code between createGoogleUser and createUser
  // TODO: filter already existing username
  // TODO: last seen
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const { user } = userCredential
      const ref = `users/${user.uid}`
      setDoc(doc(firestore, ref), {
        id: user.uid,
        displayName: username,
        photoURL: '',
        bio: username,
        posts: 0,
        followers: [],
        followings: [],
        createdAt: Date.now(),
      })
      return userCredential
    }
  )
}

export default function useCreateUser() {
  return useMutation({
    mutationFn: createUser,
    // onSuccess: (userCredential) => {},
    onError: (error: Error | AuthError) => {
      // TODO: firebase ERROR HANDLING
      // ErrorMessage[error.code] : error.message
      return error.message
    },
  })
}
