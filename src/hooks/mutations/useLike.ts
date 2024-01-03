import { useMutation } from '@tanstack/react-query'
import { arrayUnion, doc, runTransaction } from 'firebase/firestore'
import { auth, firestore } from '../../utils/firebase'
import { queryClient } from '../../main'
import { Post, User } from '../../utils/types'
import { PostKeys, UserKeys } from '../../utils/query-key'

async function like(postId: string, userId: string) {
  return runTransaction(firestore, async (transaction) => {
    transaction.set(doc(firestore, `/users/${userId}/likes/${postId}`), {
      userId,
      createdAt: Date.now(),
    })
    transaction.update(doc(firestore, `/posts/${postId}`), {
      likes: arrayUnion(userId),
    })
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
      queryClient.setQueryData(UserKeys.FEED, (oldQueryData) => {
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
        PostKeys.POST(postId),
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
