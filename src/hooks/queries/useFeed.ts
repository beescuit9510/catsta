import { useInfiniteQuery } from '@tanstack/react-query'
import {
  QueryDocumentSnapshot,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { auth } from '../../utils/firebase'
import { InfiniteQuery } from '../../utils/types'
import { UserKeys } from '../../utils/query-key'
import {
  Collections,
  Docs,
  Post,
  User,
} from '../../utils/firestore-collections-docs'

// TODO: extract shared infiniate query code
// TODO: in operation. Error caught by error boundary: FirebaseError: Invalid Query. A non-empty array is required for 'in' filters.
async function feed(startAfterDoc: QueryDocumentSnapshot) {
  const perPage = 3

  const user = await getDoc(Docs.USER(auth.currentUser!.uid)).then((doc) =>
    doc.data()
  )
  if (user!.followings.length === 0)
    return {
      perPage,
      count: 0,
      data: [],
    }

  const [countSnapshot, postSnapshots, userSnapshots] = await Promise.all([
    getCountFromServer(
      query(Collections.POSTS(), where('userId', 'in', user!.followings))
    ),
    getDocs(
      query(
        Collections.POSTS(),
        where('userId', 'in', user!.followings),
        orderBy('createdAt', 'asc'),
        startAfter(startAfterDoc),
        limit(perPage)
      )
    ),
    getDocs(query(Collections.USERS(), where('id', 'in', user!.followings))),
  ])
  const { count } = countSnapshot.data()
  const lastDoc = postSnapshots.docs.at(-1)

  const posts = postSnapshots.docs.map((doc) => doc.data())

  const userMap = Object.assign(
    {},
    ...userSnapshots.docs
      .map((doc) => doc.data())
      .map((user) => ({ [user.id]: user }))
  )

  return {
    perPage,
    lastDoc,
    count,
    data: posts.map((post) => ({
      post,
      user: userMap[post.userId],
    })),
  }
}
export type PostUser = { post: Post; user: User }

export default function useFeed() {
  const query = useInfiniteQuery<InfiniteQuery<PostUser[]>>({
    initialPageParam: null,

    queryKey: UserKeys.FEED,

    queryFn: ({ pageParam }) => feed(pageParam as QueryDocumentSnapshot),

    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.perPage * allPages.length
      const { count } = lastPage
      if (total >= count) return undefined
      return lastPage.lastDoc
    },
  })
  return query
}
