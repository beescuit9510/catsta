import { useMutation } from '@tanstack/react-query'
import { arrayRemove, runTransaction } from 'firebase/firestore'
import { auth, firestore } from '../../utils/firebase'
import { queryClient } from '../../main'
import { UserKeys } from '../../utils/query-key'
import { Docs, User } from '../../utils/firestore-collections-docs'

async function unfollowing(followingUserId: string) {
  const currentUserId = auth.currentUser!.uid

  return runTransaction(firestore, async (transaction) => {
    transaction.update(Docs.USER(currentUserId), {
      followings: arrayRemove(followingUserId),
    })
    transaction.update(Docs.USER(followingUserId), {
      followers: arrayRemove(currentUserId),
    })
  })
}

export default function useUnfollowing(followingUserId: string) {
  const currentUserId = auth.currentUser!.uid

  return useMutation({
    mutationFn: () => unfollowing(followingUserId),

    onSuccess: () => {
      queryClient.setQueryData(
        UserKeys.USER(currentUserId),
        (oldQueryData: User) => {
          return {
            ...oldQueryData,
            followings: oldQueryData.followings.filter(
              (following) => following !== followingUserId
            ),
          }
        }
      )
      queryClient.setQueryData(
        UserKeys.USER(followingUserId),
        (oldQueryData: User) => {
          return {
            ...oldQueryData,
            followers: oldQueryData.followers.filter(
              (following) => following !== currentUserId
            ),
          }
        }
      )
    },
  })
}
