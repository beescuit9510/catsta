import { useInfiniteQuery } from '@tanstack/react-query'
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { firestore } from '../../utils/firebase'
import { InfiniteLikes, Post } from '../../utils/types'
import { UserKeys } from '../../utils/query-key'

// TODO: extract shared infiniate query code

async function likes(
  userId: string,
  startAfterDoc: QueryDocumentSnapshot
): Promise<InfiniteLikes> {
  const perPage = 6
  const [total, likes] = await Promise.all([
    getCountFromServer(
      query(collection(firestore, `/users/${userId}/likes`))
    ).then((snapshot) => snapshot.data().count),
    getDocs(
      query(
        collection(firestore, `/users/${userId}/likes`),
        orderBy('createdAt', 'asc'),
        startAfter(startAfterDoc),
        limit(perPage)
      )
    ),
  ])
  const lastDoc = likes.docs.at(-1)
  const posts = await Promise.all(
    likes.docs.map((like) =>
      getDoc(doc(firestore, `/posts/${like?.id}`)).then((doc) => {
        return { ...doc.data(), likedAt: like.data().createdAt } as Post & {
          likedAt: number
        }
      })
    )
  )

  return {
    limit: perPage,
    total,
    posts,
    lastDoc: lastDoc,
  }
}

export default function useLikes(userId: string) {
  const query = useInfiniteQuery<InfiniteLikes>({
    initialPageParam: null,

    queryKey: UserKeys.LIKES(userId),

    queryFn: ({ pageParam }) =>
      likes(userId, pageParam as QueryDocumentSnapshot),

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
