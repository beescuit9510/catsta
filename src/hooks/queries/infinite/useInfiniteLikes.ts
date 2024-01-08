import { getDocs, orderBy, query, where } from 'firebase/firestore'
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

// TODO: orderBy desc
export default function useInfiniteLikes(userId: string) {
  return useCustomInfiniteQuery<LikePost[], Like>({
    queryKey: UserKeys.LIKES(userId),

    queryFn: async (fn) => {
      const queryResult = await fn({
        perPage: 6,
        countQuery: query(Collections.LIKES(userId)),
        dataQuery: query(
          Collections.LIKES(userId),
          orderBy('createdAt', 'asc')
        ),
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

      const likeMap = Object.assign(
        {},
        ...likes.map((like) => ({ [like.postId]: like }))
      )

      return {
        ...queryResult,
        data: posts.map((post) => ({ post, like: likeMap[post.id] })),
      }
    },
  })
}
