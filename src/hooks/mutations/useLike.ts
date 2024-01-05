import { useMutation } from '@tanstack/react-query'
import { arrayUnion, runTransaction } from 'firebase/firestore'
import { firestore } from '../../utils/firebase'
import { queryClient } from '../../main'
import { PostKeys, UserKeys } from '../../utils/query-key'
import { Docs, Post, User } from '../../utils/firestore-collections-docs'

async function like(postId: string, userId: string) {
  return runTransaction(firestore, async (transaction) => {
    transaction.set(Docs.LIKE(userId, postId), {
      postId,
      userId,
      createdAt: Date.now(),
    })
    transaction.update(Docs.POST(postId), {
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
      // TODO: refactor code, especially like

      queryClient.setQueryData(UserKeys.FEED, (oldQueryData) => {
        if (!oldQueryData) return {}

        return {
          ...oldQueryData,
          pages: oldQueryData!.pages!.map((page) => {
            return {
              ...page,
              data: page.data.map((item) => {
                if (item.post.id !== postId) return { ...item }
                return {
                  ...item,
                  post: { ...item.post, likes: [...item.post.likes, userId] },
                }
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
