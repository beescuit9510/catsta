import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from '../../../utils/firebase'
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator'

// TODO: last seen

export async function setUserDoc({
  id,
  photoURL = '',
  displayName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '-',
  })
    .split('-')
    .map((v) => v.at(0)!.toUpperCase() + v.slice(1)) //capitalize
    .join(' '),
}: {
  id: string
  photoURL?: string | null
  displayName?: string | null
}) {
  const userDocRef = doc(firestore, `users/${id}`)

  getDoc(userDocRef)
    .then((doc) => {
      if (doc.exists()) throw new Error('User is already in the firestore')
    })
    .then(() =>
      setDoc(userDocRef, {
        id,
        displayName,
        bio: displayName,
        photoURL,
        posts: 0,
        followers: [],
        followings: [],
        createdAt: Date.now(),
      })
    )
}
