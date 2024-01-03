import { firestore } from '../../utils/firebase'
import {
  QueryDocumentSnapshot,
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { useInfiniteQuery } from '@tanstack/react-query'
import { InfiniteSearchUser, SearchUser } from '../../utils/types'
import { UserKeys } from '../../utils/query-key'

// TODO: orderBy('lastSeenAt', 'desc'),

async function searchUser(
  searchKeyword: string,
  startAfterDoc?: QueryDocumentSnapshot
): Promise<InfiniteSearchUser> {
  const perPage = 3

  let lastDoc
  // FIXME: cannot search words in between or words at the end, when T is typed, Hell_KITTY, and kitkat is not showing up.
  // FIXME: case-sensitive search => case-insensitive
  // FIXME: cannot search korean words
  const results = await Promise.all([
    getCountFromServer(
      query(
        collection(firestore, 'users'),
        where('displayName', '>=', searchKeyword),
        where('displayName', '<=', `${searchKeyword}~`)
      )
    ).then((snapshot) => snapshot.data().count),
    getDocs(
      query(
        collection(firestore, 'users'),
        where('displayName', '>=', searchKeyword),
        where('displayName', '<=', `${searchKeyword}~`),
        orderBy('displayName', 'asc'),
        orderBy('createdAt', 'asc'),
        startAfter(startAfterDoc),
        limit(perPage)
      )
    ).then((snapshots) => {
      lastDoc = snapshots.docs[snapshots.docs.length - 1]
      return snapshots.docs.map((doc) => doc.data() as SearchUser)
    }),
  ])

  return {
    limit: perPage,
    total: results[0],
    users: results[1],
    lastDoc: lastDoc,
  }
}

export function useIntiniteSearchUser(searchKeyword: string) {
  const query = useInfiniteQuery<InfiniteSearchUser>({
    initialPageParam: null,

    queryKey: UserKeys.SEARCH(searchKeyword),

    queryFn: ({ pageParam }) =>
      searchUser(searchKeyword, pageParam as QueryDocumentSnapshot),

    getNextPageParam: (lastPage, allPages) => {
      const currentTotal = allPages.reduce((p, c) => p + c.users.length, 0)
      const { total } = lastPage

      if (currentTotal >= total) {
        return undefined
      }
      return lastPage.lastDoc
    },
  })
  return query
}
