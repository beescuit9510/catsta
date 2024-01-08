import {
  Query,
  QueryDocumentSnapshot,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { QueryKey, useInfiniteQuery } from '@tanstack/react-query'

type QueryParam = {
  perPage: number
  countQuery: Query
  dataQuery: Query
}
interface InfiniteQueryFnResult<QueryFnResut> {
  perPage: number
  count: number
  lastDoc?: QueryDocumentSnapshot<QueryFnResut>
  docs: QueryDocumentSnapshot<QueryFnResut>[]
}

type QueryFn<QueryResult, QueryFnResut> = (
  infiniteQueryFn: (
    params: QueryParam
  ) => Promise<InfiniteQueryFnResult<QueryFnResut>>
) => Promise<InfiniteQuery<QueryResult>>

async function infiniteQueryFn<QueryFnResut>({
  queryParam: { perPage, countQuery, dataQuery },
  startAfterDoc,
}: {
  queryParam: QueryParam
  startAfterDoc?: QueryDocumentSnapshot
}) {
  const [countSnapshot, dataSnapshot] = await Promise.all([
    getCountFromServer(countQuery),
    getDocs(
      startAfterDoc
        ? query(
            dataQuery,
            orderBy('createdAt', 'desc'),
            startAfter(startAfterDoc),
            limit(perPage)
          )
        : query(dataQuery, orderBy('createdAt', 'desc'), limit(perPage))
    ),
  ])

  const { count } = countSnapshot.data()
  const lastDoc = dataSnapshot.docs.at(
    -1
  ) as QueryDocumentSnapshot<QueryFnResut>

  return {
    perPage,
    count,
    lastDoc,
    docs: dataSnapshot.docs as QueryDocumentSnapshot<QueryFnResut>[],
  }
}

export interface InfiniteQuery<QueryResult> {
  perPage: number
  count: number
  lastDoc?: QueryDocumentSnapshot
  data: QueryResult
}

export function useCustomInfiniteQuery<QueryResult, QueryFnResut>({
  queryKey,
  queryFn,
}: {
  queryKey: QueryKey
  queryFn: QueryFn<QueryResult, QueryFnResut>
}) {
  const query = useInfiniteQuery<InfiniteQuery<QueryResult>>({
    initialPageParam: null,

    queryKey,

    queryFn: ({ pageParam }) => {
      return queryFn((queryParam) =>
        infiniteQueryFn<QueryFnResut>({
          queryParam,
          startAfterDoc: pageParam as QueryDocumentSnapshot,
        })
      )
    },

    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.perPage * allPages.length
      const { count } = lastPage
      if (total >= count) return undefined
      return lastPage.lastDoc
    },
  })
  return query
}
