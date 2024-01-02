import { useMutation } from '@tanstack/react-query'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../../utils/firebase'
import { queryClient } from '../../main'
import { Post, User } from '../../utils/types'

async function unlike(postId: string, userId: string) {
  return updateDoc(doc(firestore, `/posts/${postId}`), {
    likes: arrayRemove(userId),
  })
}

export default function useUnlike({
  userId,
  postId,
  onSuccess,
  onError,
}: {
  userId: string
  postId: string
  onSuccess: () => void
  onError: () => void
}) {
  return useMutation({
    mutationFn: () => unlike(postId, userId),
    onSuccess: () => {
      // TODO: clean up code and re-define shared code
      queryClient.setQueryData(
        ['posts', postId],
        (oldQueryData: { post: Post; user: User }) => {
          const updatedPost = {
            ...oldQueryData.post,
            likes: oldQueryData.post.likes.filter((user) => user !== userId),
          }
          return {
            ...oldQueryData,
            post: updatedPost,
          }
        }
      )

      onSuccess()
    },
    onError: () => {
      onError()
    },
  })
}
