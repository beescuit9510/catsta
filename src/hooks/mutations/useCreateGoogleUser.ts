import { signInWithPopup } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import { useMutation } from '@tanstack/react-query'
import { GoogleAuthProvider } from 'firebase/auth'
import { setUserDoc } from './common/setUserDoc'

async function createGoogleUser() {
  return signInWithPopup(auth, new GoogleAuthProvider()).then(({ user }) =>
    setUserDoc({ id: user.uid, displayName: user.displayName })
  )
}

export default function useCreateGoogleUser() {
  return useMutation({
    mutationFn: createGoogleUser,
  })
}
