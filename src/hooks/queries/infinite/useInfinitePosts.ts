import { query, where } from 'firebase/firestore'
import { UserKeys } from '../../../utils/query-key'
import { Collections, Post } from '../../../utils/firestore-collections-docs'
import { useCustomInfiniteQuery } from '../common/useCustomInfiniteQuery'

export default function useInfinitePosts(userId: string) {
  return useCustomInfiniteQuery<Post[], Post>({
    queryKey: UserKeys.POSTS(userId),

    queryFn: (fn) =>
      fn({
        perPage: 6,
        countQuery: query(Collections.POSTS(), where('userId', '==', userId)),
        dataQuery: query(Collections.POSTS(), where('userId', '==', userId)),
      }).then((queryResult) => ({
        ...queryResult,
        data: queryResult.docs.map((doc) => doc.data()),
      })),
  })
}
