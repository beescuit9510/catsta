import { getDocs, orderBy, query, where } from 'firebase/firestore'
import { useCustomInfiniteQuery } from '../common/useCustomInfiniteQuery'
import { PostKeys } from '../../../utils/query-key'
import {
  Collections,
  Comment,
  User,
} from '../../../utils/firestore-collections-docs'

type UserComment = {
  user: User
  comment: Comment
}

export function useIntiniteComments(postId: string) {
  return useCustomInfiniteQuery<UserComment[], Comment>({
    queryKey: PostKeys.COMMENTS(postId),
    queryFn: async (fn) => {
      const { perPage, count, lastDoc, docs } = await fn({
        perPage: 3,
        countQuery: query(Collections.COMMENTS(postId)),
        dataQuery: query(
          Collections.COMMENTS(postId),
          orderBy('createdAt', 'asc')
        ),
      })

      const comments = docs.map((doc) => doc.data())

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
        ...users.docs
          .map((doc) => doc.data())
          .map((user) => ({ [user.id]: user }))
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
    },
  })
}
