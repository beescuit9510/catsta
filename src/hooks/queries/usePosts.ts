import { useInfiniteQuery } from '@tanstack/react-query'
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
import { firestore } from '../../utils/firebase'
import { Post } from '../../utils/types'

// TODO: extract shared infiniate query code
type InfinitePost = {
  limit: number
  lastDoc?: QueryDocumentSnapshot
  total: number
  posts: Post[]
}

async function posts(
  userId: string,
  startAfterDoc: QueryDocumentSnapshot
): Promise<InfinitePost> {
  const perPage = 6
  let lastDoc
  const results = await Promise.all([
    getCountFromServer(
      query(collection(firestore, 'posts'), where('userId', '==', userId))
    ).then((snapshot) => snapshot.data().count),
    getDocs(
      query(
        collection(firestore, 'posts'),
        where('userId', '==', userId),
        orderBy('createdAt', 'asc'),
        startAfter(startAfterDoc),
        limit(perPage)
      )
    ).then((snapshots) => {
      lastDoc = snapshots.docs[snapshots.docs.length - 1]
      return snapshots.docs.map((doc) => doc.data() as Post)
    }),
  ])

  return {
    limit: perPage,
    total: results[0],
    posts: results[1],
    lastDoc: lastDoc,
  }
}

export default function usePosts(userId: string) {
  const query = useInfiniteQuery<InfinitePost>({
    initialPageParam: null,

    queryKey: ['users', userId, 'posts'],

    queryFn: ({ pageParam }) =>
      posts(userId, pageParam as QueryDocumentSnapshot),

    getNextPageParam: (lastPage, allPages) => {
      const currentTotal = allPages.reduce((p, c) => p + c.posts.length, 0)
      const { total } = lastPage

      if (currentTotal >= total) {
        return undefined
      }
      return lastPage.lastDoc
    },
  })
  return query
}
