import { getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { UserKeys } from '../../utils/query-key'
import { Collections, Docs } from '../../utils/firestore-collections-docs'

async function followers(userId: string) {
  return getDoc(Docs.USER(userId))
    .then((snap) => {
      if (!snap.exists()) throw new Error('User not found')
      else return snap.data()
    })
    .then((user) => {
      if (user.followers.length === 0) return []
      return getDocs(
        query(
          Collections.USERS(),
          where('id', 'in', user.followers),
          orderBy('displayName', 'asc')
        )
      ).then((snapshot) => snapshot.docs.map((doc) => doc.data()))
    })
}

export function useFollowers(userId: string) {
  const query = useQuery({
    queryKey: UserKeys.FOLLOWERS(userId),
    queryFn: () => followers(userId),
  })
  return query
}
