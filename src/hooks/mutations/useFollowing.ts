import { useMutation } from '@tanstack/react-query'
import { arrayUnion, runTransaction } from 'firebase/firestore'
import { auth, firestore } from '../../utils/firebase'
import { queryClient } from '../../main'
import { UserKeys } from '../../utils/query-key'
import { Docs, User } from '../../utils/firestore-collections-docs'

async function following(followingUserId: string) {
  const currentUserId = auth.currentUser!.uid
  return runTransaction(firestore, async (transaction) => {
    transaction.update(Docs.USER(currentUserId), {
      followings: arrayUnion(followingUserId),
    })
    transaction.update(Docs.USER(followingUserId), {
      followers: arrayUnion(currentUserId),
    })
  })
}

export default function useFollowing(followingUserId: string) {
  const currentUserId = auth.currentUser!.uid
  return useMutation({
    mutationFn: () => following(followingUserId),

    onSuccess: () => {
      queryClient.setQueryData(
        UserKeys.USER(currentUserId),
        (oldQueryData: User) => {
          return {
            ...oldQueryData,
            followings: [...oldQueryData.followings, followingUserId],
          }
        }
      )

      queryClient.setQueryData(
        UserKeys.USER(followingUserId),
        (oldQueryData: User) => {
          return {
            ...oldQueryData,
            followers: [...oldQueryData.followers, currentUserId],
          }
        }
      )
    },
  })
}
