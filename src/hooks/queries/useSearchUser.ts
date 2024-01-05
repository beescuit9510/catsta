import {
  QueryDocumentSnapshot,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { useInfiniteQuery } from '@tanstack/react-query'
import { InfiniteQuery } from '../../utils/types'
import { UserKeys } from '../../utils/query-key'
import { Collections, User } from '../../utils/firestore-collections-docs'

// TODO: orderBy('lastSeenAt', 'desc'),

async function searchUser(
  searchKeyword: string,
  startAfterDoc?: QueryDocumentSnapshot
) {
  const perPage = 3

  // FIXME: cannot search words in between or words at the end, when T is typed, Hell_KITTY, and kitkat is not showing up.
  // FIXME: case-sensitive search => case-insensitive
  // FIXME: cannot search korean words
  const [countSnapshot, userSnapshot] = await Promise.all([
    getCountFromServer(
      query(
        Collections.USERS(),
        where('displayName', '>=', searchKeyword),
        where('displayName', '<=', `${searchKeyword}~`)
      )
    ),
    getDocs(
      query(
        Collections.USERS(),
        where('displayName', '>=', searchKeyword),
        where('displayName', '<=', `${searchKeyword}~`),
        orderBy('displayName', 'asc'),
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

export function useIntiniteSearchUser(searchKeyword: string) {
  const query = useInfiniteQuery<InfiniteQuery<User[]>>({
    initialPageParam: null,

    queryKey: UserKeys.SEARCH(searchKeyword),

    queryFn: ({ pageParam }) =>
      searchUser(searchKeyword, pageParam as QueryDocumentSnapshot),

    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.perPage * allPages.length
      const { count } = lastPage
      if (total >= count) return undefined
      return lastPage.lastDoc
    },
  })
  return query
}
