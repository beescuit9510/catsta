import { firestore } from '../../utils/firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { User } from '../../utils/types'
import { UserKeys } from '../../utils/query-key'

async function followers(userId: string): Promise<User[]> {
  return getDoc(doc(firestore, 'users', userId))
    .then((snap) => {
      if (!snap.exists()) throw new Error('User not found')
      else return snap.data() as User
    })
    .then((user) => {
      if (user.followers.length === 0) return []
      return getDocs(
        query(collection(firestore, 'users'), where('id', 'in', user.followers))
      ).then((snapshot) => snapshot.docs.map((doc) => doc.data() as User))
    })
}

export function useFollowers(userId: string) {
  const query = useQuery({
    queryKey: UserKeys.FOLLOWERS(userId),
    queryFn: () => followers(userId),
  })
  return query
}
