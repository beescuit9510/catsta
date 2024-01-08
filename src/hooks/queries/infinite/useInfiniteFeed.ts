import { auth } from '../../../utils/firebase'
import {
  Collections,
  Docs,
  Post,
  User,
} from '../../../utils/firestore-collections-docs'
import { UserKeys } from '../../../utils/query-key'
import { getDoc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { useCustomInfiniteQuery } from '../common/useCustomInfiniteQuery'

export type PostUser = { post: Post; user: User }

// TODO: orderby desc
export default function useInfiniteFeed() {
  return useCustomInfiniteQuery<PostUser[], Post>({
    queryKey: UserKeys.FEED,

    queryFn: async (fn) => {
      const user = await getDoc(Docs.USER(auth.currentUser!.uid)).then((doc) =>
        doc.data()
      )

      if (user!.followings.length === 0)
        return { perPage: 3, count: 0, data: [] }

      const [{ perPage, count, lastDoc, docs }, userSnapshots] =
        await Promise.all([
          fn({
            perPage: 3,
            countQuery: query(
              Collections.POSTS(),
              where('userId', 'in', user!.followings)
            ),
            dataQuery: query(
              Collections.POSTS(),
              where('userId', 'in', user!.followings),
              orderBy('createdAt', 'asc')
            ),
          }),
          getDocs(
            query(Collections.USERS(), where('id', 'in', user!.followings))
          ),
        ])

      const posts = docs.map((doc) => doc.data())
      const userMap = Object.assign(
        {},
        ...userSnapshots.docs
          .map((doc) => doc.data())
          .map((user) => ({ [user.id]: user }))
      )

      return {
        perPage,
        count,
        lastDoc,
        data: posts.map((post) => ({
          post,
          user: userMap[post.userId],
        })),
      }
    },
  })
}
