import { doc, setDoc } from 'firebase/firestore'
import { auth, firestore } from '../utils/firebase'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { ErrorMessage } from '../utils/constant'

export default function useSignUpWithEmailAndPassword() {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  const signUp = (email: string, password: string, username: string) => {
    createUserWithEmailAndPassword(email, password).then((userCredential) => {
      if (userCredential) {
        const { user } = userCredential
        const ref = `users/${user.uid}`
        // SAVE USER
        setDoc(doc(firestore, ref), {
          userRef: ref,
          displayName: username,
          photoURL: '',
          bio: username,
          posts: 0,
          followers: [],
          followings: [],
        })
      }
    })
  }

  return {
    signUp,
    user,
    loading,
    error: error !== undefined,
    errorMessage:
      error !== undefined
        ? ErrorMessage[error.code] ?? error.message
        : undefined,
  }
}
