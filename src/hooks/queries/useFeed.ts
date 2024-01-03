import { useInfiniteQuery } from '@tanstack/react-query'
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
  where,
} from 'firebase/firestore'
import { auth, firestore } from '../../utils/firebase'
import { InfinitePost, Post, User } from '../../utils/types'
import { UserKeys } from '../../utils/query-key'

// TODO: extract shared infiniate query code

async function feed(
  startAfterDoc: QueryDocumentSnapshot
): Promise<InfinitePost> {
  const perPage = 2
  const userRef = await getDoc(
    doc(firestore, `/users/${auth.currentUser?.uid}`)
  )
  const user = userRef.data() as User
  let lastDoc
  const [total, posts] = await Promise.all([
    getCountFromServer(
      query(
        collection(firestore, 'posts'),
        where('userId', 'in', user.followings)
      )
    ).then((snapshot) => snapshot.data().count),
    getDocs(
      query(
        collection(firestore, 'posts'),
        where('userId', 'in', user.followings),
        orderBy('createdAt', 'asc'),
        startAfter(startAfterDoc),
        limit(perPage)
      )
    ).then((snapshots) => {
      lastDoc = snapshots.docs[snapshots.docs.length - 1]
      return snapshots.docs.map((doc) => doc.data() as Post)
    }),
  ])
  const users = await Promise.all(
    posts.map((post) =>
      getDoc(doc(firestore, `/users/${post.userId}`)).then(
        (userRef) => userRef.data() as User
      )
    )
  )

  // const userMap = Object!.groupBy(users, (user) => user.id)

  return {
    limit: perPage,
    total,
    posts: posts.map((post) => ({ post: post, user: users[0] })),
    lastDoc: lastDoc,
  }
}

export default function useFeed() {
  const query = useInfiniteQuery<InfinitePost>({
    initialPageParam: null,

    queryKey: UserKeys.FEED,

    queryFn: ({ pageParam }) => feed(pageParam as QueryDocumentSnapshot),

    getNextPageParam: (lastPage, allPages) => {
      const currentTotal = allPages.reduce((p, c) => p + c.posts.length, 0)
      const { total } = lastPage

      if (currentTotal >= total) {
        return undefined
      }
      return lastPage.lastDoc
    },
  })
  return query
}
