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
import { PostKeys } from '../../utils/query-key'
import {
  User,
  Comment,
  Collections,
} from '../../utils/firestore-collections-docs'

// TODO: extract shared infiniate query code
async function comments(postId: string, startAfterDoc?: QueryDocumentSnapshot) {
  const perPage = 3
  const [countSnapshot, commentSnapshot] = await Promise.all([
    getCountFromServer(query(Collections.COMMENTS(postId))),
    getDocs(
      query(
        Collections.COMMENTS(postId),
        orderBy('createdAt', 'asc'),
        startAfter(startAfterDoc),
        limit(perPage)
      )
    ),
  ])
  const { count } = countSnapshot.data()
  const lastDoc = commentSnapshot.docs.at(-1)
  const comments = commentSnapshot.docs.map((doc) => doc.data())

  if (comments.length === 0)
    return {
      perPage,
      count,
      lastDoc,
      data: [],
    }

  const userIds = Array.from(new Set(comments.map((v) => v.userId)))

  const users = await getDocs(
    query(Collections.USERS(), where('id', 'in', userIds))
  )
  const userMap = Object.assign(
    {},
    ...users.docs.map((doc) => doc.data()).map((user) => ({ [user.id]: user }))
  )

  return {
    perPage,
    count,
    lastDoc,
    data: comments.map((comment) => ({
      comment,
      user: userMap[comment.userId],
    })),
  }
}

type UserComment = {
  user: User
  comment: Comment
}

export function useIntiniteComments(postId: string) {
  const query = useInfiniteQuery<InfiniteQuery<UserComment[]>>({
    initialPageParam: null,

    queryKey: PostKeys.COMMENTS(postId),

    queryFn: ({ pageParam }) =>
      comments(postId, pageParam as QueryDocumentSnapshot),

    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.perPage * allPages.length
      const { count } = lastPage
      if (total >= count) return undefined
      return lastPage.lastDoc
    },
  })
  return query
}
