import { getDoc } from 'firebase/firestore'
import { useQuery } from '@tanstack/react-query'
import { PostKeys } from '../../utils/query-key'
import { Docs } from '../../utils/firestore-collections-docs'

async function post(postId: string) {
  const postSnapshot = await getDoc(Docs.POST(postId))
  if (!postSnapshot.exists()) throw new Error('Post not found')

  const post = postSnapshot.data()

  const userSnapshot = await getDoc(Docs.USER(post.userId))
  if (!userSnapshot.exists()) throw new Error('User not found')

  const user = userSnapshot.data()
  return {
    post,
    user,
  }
}

export default function usePost(postId: string) {
  const query = useQuery({
    queryKey: PostKeys.POST(postId),
    queryFn: () => post(postId),
  })
  return query
}
