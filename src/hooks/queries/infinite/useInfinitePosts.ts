import { orderBy, query, where } from 'firebase/firestore'
import { UserKeys } from '../../../utils/query-key'
import { Collections, Post } from '../../../utils/firestore-collections-docs'
import { useCustomInfiniteQuery } from '../common/useCustomInfiniteQuery'

// TODO: orderBy desc
export default function useInfinitePosts(userId: string) {
  return useCustomInfiniteQuery<Post[], Post>({
    queryKey: UserKeys.POSTS(userId),

    queryFn: (fn) =>
      fn({
        perPage: 6,
        countQuery: query(Collections.POSTS(), where('userId', '==', userId)),
        dataQuery: query(
          Collections.POSTS(),
          where('userId', '==', userId),
          orderBy('createdAt', 'asc')
        ),
      }).then((queryResult) => ({
        ...queryResult,
        data: queryResult.docs.map((doc) => doc.data()),
      })),
  })
}
