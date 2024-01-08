import { getDocs, query, where } from 'firebase/firestore'
import {
  Collections,
  Like,
  Post,
} from '../../../utils/firestore-collections-docs'
import { UserKeys } from '../../../utils/query-key'
import { useCustomInfiniteQuery } from '../common/useCustomInfiniteQuery'

type LikePost = {
  post: Post
  like: Like
}

export default function useInfiniteLikes(userId: string) {
  return useCustomInfiniteQuery<LikePost[], Like>({
    queryKey: UserKeys.LIKES(userId),

    queryFn: async (fn) => {
      const queryResult = await fn({
        perPage: 6,
        countQuery: query(Collections.LIKES(userId)),
        dataQuery: query(Collections.LIKES(userId)),
      })

      const likes = queryResult.docs.map((doc) => doc.data())

      if (likes.length === 0)
        return {
          ...queryResult,
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

      const postMap = Object.assign(
        {},
        ...posts.map((post) => ({ [post.id]: post }))
      )

      return {
        ...queryResult,
        data: likes.map((like) => ({ post: postMap[like.postId], like })),
      }
    },
  })
}
