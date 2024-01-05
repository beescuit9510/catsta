import { useMutation } from '@tanstack/react-query'
import { arrayRemove, runTransaction } from 'firebase/firestore'
import { firestore } from '../../utils/firebase'
import { queryClient } from '../../main'
import { PostKeys, UserKeys } from '../../utils/query-key'
import { Docs, Post, User } from '../../utils/firestore-collections-docs'

async function unlike(postId: string, userId: string) {
  return runTransaction(firestore, async (transaction) => {
    transaction.delete(Docs.LIKE(userId, postId))

    transaction.update(Docs.POST(postId), {
      likes: arrayRemove(userId),
    })
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
  onSuccess?: () => void
  onError?: () => void
}) {
  return useMutation({
    mutationFn: () => unlike(postId, userId),
    onSuccess: () => {
      // TODO: clean up code and re-define shared code

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
                  post: {
                    ...item.post,
                    likes: item.post.likes.filter((uid) => uid !== userId),
                  },
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
            likes: oldQueryData.post.likes.filter((uid) => uid !== userId),
          }
          return {
            ...oldQueryData,
            post: updatedPost,
          }
        }
      )

      onSuccess && onSuccess()
    },
    onError: (erorr) => {
      console.error(erorr)
      onError && onError()
    },
  })
}
