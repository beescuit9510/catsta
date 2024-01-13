import { InfiniteData, useMutation } from '@tanstack/react-query'
import { arrayUnion, runTransaction } from 'firebase/firestore'
import { auth, firestore } from '../../utils/firebase'
import { queryClient } from '../../main'
import { PostKeys, UserKeys } from '../../utils/query-key'
import { Docs } from '../../utils/firestore-collections-docs'
import { UserPost } from '../queries/usePost'
import { PostUser } from '../queries/infinite/useInfiniteFeed'
import { InfiniteQuery } from '../queries/common/useCustomInfiniteQuery'
import { addNotificationDoc } from './common/addNotificationDoc'
import { useCachedUser } from '../queries/useUser'

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
  const currentUser = useCachedUser(auth.currentUser!.uid)

  return useMutation({
    mutationFn: () => like(postId, userId),
    onSuccess: () => {
      addNotificationDoc({
        action: 'likedPost',
        sender: {
          userId: currentUser!.id,
          photoURL: currentUser!.photoURL,
          displayName: currentUser!.displayName,
        },
        postId,
      })

      queryClient.setQueryData<InfiniteData<InfiniteQuery<PostUser[]>>>(
        UserKeys.FEED,
        (oldQueryData) => {
          if (!oldQueryData) return oldQueryData
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
        }
      )

      queryClient.setQueryData<UserPost>(
        PostKeys.POST(postId),
        (oldQueryData) => {
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
