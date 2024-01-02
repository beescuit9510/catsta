import { firestore } from '../../utils/firebase'
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Comment, InfiniteComment, User } from '../../utils/types'

// TODO: orderBy('lastSeenAt', 'desc'),

async function searchUser(
  postId: string,
  startAfterDoc?: QueryDocumentSnapshot
): Promise<InfiniteComment> {
  const perPage = 3

  let lastDoc
  const results = await Promise.all([
    getCountFromServer(
      query(collection(firestore, 'posts', postId, 'comments'))
    ).then((snapshot) => snapshot.data().count),
    getDocs(
      query(
        collection(firestore, 'posts', postId, 'comments'),
        orderBy('createdAt', 'asc'),
        startAfter(startAfterDoc),
        limit(perPage)
      )
    ).then((snapshots) => {
      lastDoc = snapshots.docs[snapshots.docs.length - 1]
      return snapshots.docs.map((doc) => doc.data() as Comment)
    }),
  ])

  const users = await Promise.all(
    Array.from(new Set(results[1].map((comment) => comment.userId))).map(
      (userId) =>
        getDoc(doc(firestore, `/users/${userId}`)).then(
          (snapshot) => snapshot.data() as User
        )
    )
  )

  // TODO: clean up code.
  const userMap = Object!.groupBy(users, (user) => user.id)

  return {
    limit: perPage,
    total: results[0],
    comments: results[1].map((comment) => ({
      ...comment,
      user: userMap[comment.userId][0],
    })),

    lastDoc: lastDoc,
  }
}

export function useIntiniteComments(postId: string) {
  const query = useInfiniteQuery<InfiniteComment>({
    initialPageParam: null,

    queryKey: ['posts', postId, 'comments'],

    queryFn: ({ pageParam }) =>
      searchUser(postId, pageParam as QueryDocumentSnapshot),

    getNextPageParam: (lastPage, allPages) => {
      const currentTotal = allPages.reduce((p, c) => p + c.comments.length, 0)
      const { total } = lastPage

      if (currentTotal >= total) {
        return undefined
      }
      return lastPage.lastDoc
    },
  })
  return query
}
