import { getDoc, setDoc } from 'firebase/firestore'
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator'
import { Docs } from '../../../utils/firestore-collections-docs'

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
  const userDocRef = Docs.USER(id)

  getDoc(userDocRef)
    .then((doc) => {
      if (doc.exists()) throw new Error('User is already in the firestore')
    })
    .then(() =>
      setDoc(userDocRef, {
        id,
        displayName: displayName!,
        bio: displayName!,
        photoURL: photoURL!,
        posts: 0,
        followers: [],
        followings: [],
        createdAt: Date.now(),
      })
    )
}
