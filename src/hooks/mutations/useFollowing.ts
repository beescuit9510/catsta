import { useMutation } from '@tanstack/react-query'
import { arrayUnion, doc, runTransaction } from 'firebase/firestore'
import { firestore } from '../../utils/firebase'
import { queryClient } from '../../main'
import { User } from '../../utils/types'
import { UserKeys } from '../../utils/query-key'

async function following(userId: string, followingUserId: string) {
  return runTransaction(firestore, async (transaction) => {
    transaction.update(doc(firestore, `users/${userId}`), {
      followings: arrayUnion(followingUserId),
    })
    transaction.update(doc(firestore, `users/${followingUserId}`), {
      followers: arrayUnion(userId),
    })
  }).then(() => ({ userId, followingUserId }))
}

export default function useFollowing({
  userId,
  followingUserId,
}: {
  userId: string
  followingUserId: string
}) {
  return useMutation({
    mutationFn: () => following(userId, followingUserId),

    onSuccess: ({ userId, followingUserId }) => {
      queryClient.setQueryData(UserKeys.USER(userId), (oldQueryData: User) => {
        return {
          ...oldQueryData,
          followings: [...oldQueryData.followings, followingUserId],
        }
      })

      queryClient.setQueryData(
        UserKeys.USER(followingUserId),
        (oldQueryData: User) => {
          return {
            ...oldQueryData,
            followers: [...oldQueryData.followers, userId],
          }
        }
      )
    },
  })
}
