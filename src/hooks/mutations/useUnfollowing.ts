import { useMutation } from '@tanstack/react-query'
import { arrayRemove, doc, runTransaction } from 'firebase/firestore'
import { firestore } from '../../utils/firebase'
import { queryClient } from '../../main'
import { User } from '../../utils/types'
import { UserKeys } from '../../utils/query-key'

async function unfollowing(userId: string, followingUserId: string) {
  return runTransaction(firestore, async (transaction) => {
    transaction.update(doc(firestore, `users/${userId}`), {
      followings: arrayRemove(followingUserId),
    })
    transaction.update(doc(firestore, `users/${followingUserId}`), {
      followers: arrayRemove(userId),
    })
  }).then(() => ({ userId, followingUserId }))
}

export default function useUnfollowing({
  userId,
  followingUserId,
}: {
  userId: string
  followingUserId: string
}) {
  return useMutation({
    mutationFn: () => unfollowing(userId, followingUserId),

    onSuccess: ({ userId, followingUserId }) => {
      queryClient.setQueryData(UserKeys.USER(userId), (oldQueryData: User) => {
        return {
          ...oldQueryData,
          followings: oldQueryData.followings.filter(
            (following) => following !== followingUserId
          ),
        }
      })

      queryClient.setQueryData(
        UserKeys.USER(followingUserId),
        (oldQueryData: User) => {
          return {
            ...oldQueryData,
            followers: oldQueryData.followings.filter(
              (following) => following !== userId
            ),
          }
        }
      )
    },
  })
}
