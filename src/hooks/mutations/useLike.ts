import { useMutation } from '@tanstack/react-query'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { auth, firestore } from '../../utils/firebase'
import { queryClient } from '../../main'
import { Post, User } from '../../utils/types'

async function like(postId: string, userId: string) {
  return updateDoc(doc(firestore, `/posts/${postId}`), {
    likes: arrayUnion(userId),
  })
}

export default function useLike({
  userId,
  postId,
  onSuccess,
  onError,
}: {
  userId: string
  postId: string
  onSuccess?: () => void
  onError?: () => void
}) {
  return useMutation({
    mutationFn: () => like(postId, userId),
    onSuccess: () => {
      // TODO: clean up code and re-define shared code
      queryClient.setQueryData(['users', 'feed'], (oldQueryData) => {
        if (!oldQueryData) return

        return {
          ...oldQueryData,
          pages: oldQueryData?.pages?.map((page) => {
            return {
              ...page,
              posts: page.posts.map((data) => {
                if (postId !== data.post.id) return data
                const newPost = {
                  ...data.post,
                  likes: [...data.post.likes, auth.currentUser!.uid],
                }
                return { ...data, post: newPost }
              }),
            }
          }),
        }
      })

      queryClient.setQueryData(
        ['posts', postId],
        (oldQueryData: { post: Post; user: User }) => {
          if (!oldQueryData) return

          const updatedPost = {
            ...oldQueryData.post,
            likes: [...oldQueryData.post.likes, userId],
          }
          return {
            ...oldQueryData,
            post: updatedPost,
          }
        }
      )

      if (onSuccess) onSuccess()
    },
    onError: (erorr) => {
      console.error(erorr)
      if (onError) onError()
    },
  })
}
