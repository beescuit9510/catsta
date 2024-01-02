import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../../utils/firebase'
import { Post, User } from '../../utils/types'
import { useQuery } from '@tanstack/react-query'

// TODO: extract shared infiniate query code
async function post(postId: string): Promise<{ post: Post; user: User }> {
  const postSnapshot = await getDoc(doc(firestore, `posts/${postId}`))
  if (!postSnapshot.exists()) throw new Error('Post not found')

  const post = postSnapshot.data() as Post

  const userSnapshot = await getDoc(doc(firestore, `users/${post.userId}`))
  if (!userSnapshot.exists()) throw new Error('User not found')

  const user = userSnapshot.data() as User

  return {
    post,
    user,
  }
}

export default function usePost(postId: string) {
  const query = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => post(postId),
  })
  return query
}
