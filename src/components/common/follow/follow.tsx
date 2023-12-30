import { Button } from '@chakra-ui/react'
import {
  arrayRemove,
  arrayUnion,
  doc,
  runTransaction,
} from 'firebase/firestore'
import { firestore } from '../../../utils/firebase'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../main'

type FollowProps = {
  userId: string
  followingUserId: string
}

// TODO: extract shared type
type User = {
  id: string
  displayName: string
  photoURL: string
  bio: string
  posts: number
  followers: string[]
  followings: string[]
  createdAt: string
}

function FollowButton({ userId, followingUserId }: FollowProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      runTransaction(firestore, async (transaction) => {
        transaction.update(doc(firestore, `users/${userId}`), {
          followings: arrayUnion(followingUserId),
        })
        transaction.update(doc(firestore, `users/${followingUserId}`), {
          followers: arrayUnion(userId),
        })
      }).then(() => ({ userId, followingUserId })),

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

  return (
    <>
      <Button
        isLoading={isPending}
        isDisabled={isPending}
        onClick={() => mutate()}
      >
        Follow
      </Button>
    </>
  )
}

function UnfollowButton({ userId, followingUserId }: FollowProps) {
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      runTransaction(firestore, async (transaction) => {
        transaction.update(doc(firestore, `users/${userId}`), {
          followings: arrayRemove(followingUserId),
        })
        transaction.update(doc(firestore, `users/${followingUserId}`), {
          followers: arrayRemove(userId),
        })
      }).then(() => ({ userId, followingUserId })),

    onSuccess: ({ userId, followingUserId }) => {
      queryClient.setQueryData(['users', userId], (oldQueryData: User) => {
        console.log('oldQueryData', oldQueryData)
        return {
          ...oldQueryData,
          followings: oldQueryData.followings.filter(
            (following) => following !== followingUserId
          ),
        }
      })

      queryClient.setQueryData(
        ['users', followingUserId],
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

  return (
    <Button
      isLoading={isPending}
      isDisabled={isPending}
      onClick={() => mutate()}
    >
      Unfollow
    </Button>
  )
}

export default function Follow({
  userId,
  followingUserId,
  following,
}: FollowProps & { following: boolean }) {
  return (
    <>
      {following ? (
        <UnfollowButton userId={userId} followingUserId={followingUserId} />
      ) : (
        <FollowButton userId={userId} followingUserId={followingUserId} />
      )}
    </>
  )
}
