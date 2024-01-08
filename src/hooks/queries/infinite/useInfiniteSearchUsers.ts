import { orderBy, query, where } from 'firebase/firestore'
import { UserKeys } from '../../../utils/query-key'
import { Collections, User } from '../../../utils/firestore-collections-docs'
import { useCustomInfiniteQuery } from '../common/useCustomInfiniteQuery'

// FIXME: cannot search words in between or words at the end, when T is typed, Hell_KITTY, and kitkat is not showing up.
// FIXME: case-sensitive search => case-insensitive
// FIXME: cannot search korean words
export function useInfiniteSearchUsers(searchKeyword: string) {
  return useCustomInfiniteQuery<User[], User>({
    queryKey: UserKeys.SEARCH(searchKeyword),

    queryFn: (fn) =>
      fn({
        perPage: 3,
        countQuery: query(
          Collections.USERS(),
          where('displayName', '>=', searchKeyword),
          where('displayName', '<=', `${searchKeyword}~`)
        ),
        dataQuery: query(
          Collections.USERS(),
          where('displayName', '>=', searchKeyword),
          where('displayName', '<=', `${searchKeyword}~`),
          orderBy('displayName', 'asc')
        ),
      }).then((queryResult) => ({
        ...queryResult,
        data: queryResult.docs.map((doc) => doc.data()),
      })),
  })
}
