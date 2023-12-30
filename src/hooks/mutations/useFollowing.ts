import { useMutation } from '@tanstack/react-query'
import { arrayUnion, doc, runTransaction } from 'firebase/firestore'
import { firestore } from '../../utils/firebase'
import { queryClient } from '../../main'
import { User } from '../../utils/types'

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
      queryClient.setQueryData(['users', userId], (oldQueryData: User) => {
        return {
          ...oldQueryData,
          followings: [...oldQueryData.followings, followingUserId],
        }
      })

      queryClient.setQueryData(
        ['users', followingUserId],
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
