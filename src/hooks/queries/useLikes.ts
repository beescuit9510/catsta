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
import { UserKeys } from '../../utils/query-key'
import { Collections, Like, Post } from '../../utils/firestore-collections-docs'
import { InfiniteQuery } from '../../utils/types'

async function likes(userId: string, startAfterDoc: QueryDocumentSnapshot) {
  const perPage = 6
  const [countSnapshot, likeSnapshot] = await Promise.all([
    getCountFromServer(query(Collections.LIKES(userId))),
    getDocs(
      query(
        Collections.LIKES(userId),
        orderBy('createdAt', 'asc'),
        startAfter(startAfterDoc),
        limit(perPage)
      )
    ),
  ])

  const { count } = countSnapshot.data()
  const lastDoc = likeSnapshot.docs.at(-1)
  const likes = likeSnapshot.docs.map((doc) => doc.data())
  if (likes.length === 0)
    return {
      count,
      perPage,
      lastDoc,
      data: [],
    }

  const posts = await getDocs(
    query(
      Collections.POSTS(),
      where(
        'id',
        'in',
        likes.map((like) => like.postId)
      )
    )
  )
    .then((snapshot) => snapshot.docs.map((doc) => doc.data()))
    .catch(() => [])

  const likeMap = Object.assign(
    {},
    ...likes.map((like) => ({ [like.postId]: like }))
  )

  return {
    count,
    perPage,
    lastDoc,
    data: posts.map((post) => ({ post, like: likeMap[post.id] })),
  }
}

type LikePost = {
  post: Post
  like: Like
}

export default function useLikes(userId: string) {
  const query = useInfiniteQuery<InfiniteQuery<LikePost[]>>({
    initialPageParam: null,

    queryKey: UserKeys.LIKES(userId),

    queryFn: ({ pageParam }) =>
      likes(userId, pageParam as QueryDocumentSnapshot),

    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.perPage * allPages.length
      const { count } = lastPage
      if (total >= count) return undefined
      return lastPage.lastDoc
    },
  })
  return query
}
