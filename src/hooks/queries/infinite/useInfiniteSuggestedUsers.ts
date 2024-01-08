import { orderBy, query } from 'firebase/firestore'
import { Collections, User } from '../../../utils/firestore-collections-docs'
import { UserKeys } from '../../../utils/query-key'
import { useCustomInfiniteQuery } from '../common/useCustomInfiniteQuery'

// TODO: orderBy desc
export function useIntiniteSuggestedUsers() {
  return useCustomInfiniteQuery<User[], User>({
    queryKey: UserKeys.SUGGESTED_USERS(),

    queryFn: (fn) =>
      fn({
        perPage: 3,
        countQuery: query(Collections.USERS()),
        dataQuery: query(Collections.USERS(), orderBy('createdAt', 'asc')),
      }).then((queryResult) => ({
        ...queryResult,
        data: queryResult.docs.map((doc) => doc.data()),
      })),
  })
}
