import { useInfiniteQuery } from '@tanstack/react-query'
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
import { InfiniteQuery } from '../../utils/types'
import { UserKeys } from '../../utils/query-key'
import { Collections, Post } from '../../utils/firestore-collections-docs'

async function posts(userId: string, startAfterDoc: QueryDocumentSnapshot) {
  const perPage = 6
  const [countSnapshot, postSnapshot] = await Promise.all([
    getCountFromServer(
      query(Collections.POSTS(), where('userId', '==', userId))
    ),
    getDocs(
      query(
        Collections.POSTS(),
        where('userId', '==', userId),
        orderBy('createdAt', 'asc'),
        startAfter(startAfterDoc),
        limit(perPage)
      )
    ),
  ])
  const { count } = countSnapshot.data()
  const lastDoc = postSnapshot.docs.at(-1)
  const posts = postSnapshot.docs.map((doc) => doc.data())

  return {
    perPage,
    count,
    lastDoc,
    data: posts,
  }
}

export default function usePosts(userId: string) {
  const query = useInfiniteQuery<InfiniteQuery<Post[]>>({
    initialPageParam: null,

    queryKey: UserKeys.POSTS(userId),

    queryFn: ({ pageParam }) =>
      posts(userId, pageParam as QueryDocumentSnapshot),

    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.perPage * allPages.length
      const { count } = lastPage
      if (total >= count) return undefined
      return lastPage.lastDoc
    },
  })
  return query
}
