import { getDoc, getDocs, query, where } from 'firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { UserKeys } from '../../utils/query-key'
import { Collections, Docs } from '../../utils/firestore-collections-docs'

async function followings(userId: string) {
  return getDoc(Docs.USER(userId))
    .then((snap) => {
      if (!snap.exists()) throw new Error('User not found')
      else return snap.data()
    })
    .then((user) => {
      if (user.followings.length === 0) return []

      return getDocs(
        query(Collections.USERS(), where('id', 'in', user.followings))
      ).then((snapshot) => snapshot.docs.map((doc) => doc.data()))
    })
}

export function useFollowings(userId: string) {
  const query = useQuery({
    queryKey: UserKeys.FOLLOWINGS(userId),
    queryFn: () => followings(userId),
  })
  return query
}
