import {
  QueryDocumentSnapshot,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { useInfiniteQuery } from '@tanstack/react-query'
import { InfiniteQuery } from '../../utils/types'
import { UserKeys } from '../../utils/query-key'
import { Collections, User } from '../../utils/firestore-collections-docs'

// TODO: orderBy('lastSeenAt', 'desc'),

async function suggestedUser(startAfterDoc?: QueryDocumentSnapshot) {
  const perPage = 3

  const [countSnapshot, userSnapshot] = await Promise.all([
    getCountFromServer(query(Collections.USERS())),
    getDocs(
      query(
        Collections.USERS(),
        orderBy('createdAt', 'asc'),
        startAfter(startAfterDoc),
        limit(perPage)
      )
    ),
  ])
  const { count } = countSnapshot.data()
  const lastDoc = userSnapshot.docs.at(-1)
  const users = userSnapshot.docs.map((doc) => doc.data())

  return {
    perPage,
    count,
    lastDoc,
    data: users,
  }
}

export function useIntiniteSuggestedUsers() {
  const query = useInfiniteQuery<InfiniteQuery<User[]>>({
    initialPageParam: null,

    queryKey: UserKeys.SUGGESTED_USERS(),

    queryFn: ({ pageParam }) =>
      suggestedUser(pageParam as QueryDocumentSnapshot),

    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.perPage * allPages.length
      const { count } = lastPage
      if (total >= count) return undefined
      return lastPage.lastDoc
    },
  })
  return query
}
