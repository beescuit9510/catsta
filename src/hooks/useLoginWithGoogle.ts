import { doc, setDoc } from 'firebase/firestore'
import { auth, firestore } from '../utils/firebase'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'

export default function useLoginWithGoogle() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

  const signIn = () => {
    signInWithGoogle().then((userCredential) => {
      if (userCredential) {
        const { user } = userCredential
        const ref = `users/${user.uid}`
        // SAVE USER
        setDoc(doc(firestore, ref), {
          userRef: ref,
          displayName: user.displayName,
          photoURL: user.photoURL,
          bio: user.displayName,
          posts: 0,
          followers: [],
          followings: [],
        })
      }
    })
  }

  return {
    signIn,
    user,
    loading,
    error,
  }
}
