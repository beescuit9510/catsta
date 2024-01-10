import { orderBy, query, where } from 'firebase/firestore'
import { UserKeys } from '../../../utils/query-key'
import { Collections, User } from '../../../utils/firestore-collections-docs'
import { useCustomInfiniteQuery } from '../common/useCustomInfiniteQuery'

// TODO: cannot search words in between e.g. when T is typed, Hell_KITTY, and kitkat is not showing up
// TODO: case-sensitive search => case-insensitive
export function useInfiniteSearchUsers(searchKeyword: string) {
  return useCustomInfiniteQuery<User[], User>({
    queryKey: UserKeys.SEARCH(searchKeyword),

    queryFn: (fn) =>
      fn({
        perPage: 3,
        countQuery: query(
          Collections.USERS(),
          orderBy('displayName'),
          where('displayName', '>=', searchKeyword),
          where('displayName', '<', `${searchKeyword}\uf8ff`)
        ),
        dataQuery: query(
          Collections.USERS(),
          orderBy('displayName'),
          where('displayName', '>=', searchKeyword),
          where('displayName', '<', `${searchKeyword}\uf8ff`)
        ),
      }).then((queryResult) => ({
        ...queryResult,
        data: queryResult.docs.map((doc) => doc.data()),
      })),
  })
}
