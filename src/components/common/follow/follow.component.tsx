import { Button } from '@chakra-ui/react'
import useUnfollowing from '../../../hooks/mutations/useUnfollowing'
import useFollowing from '../../../hooks/mutations/useFollowing'
import { useUser } from '../../../hooks/queries/useUser'
import { auth } from '../../../utils/firebase'

export default function Follow({
  followingUserId,
}: {
  followingUserId: string
}) {
  const { data: currentUser } = useUser(auth.currentUser!.uid)

  const isFollowing = currentUser!.followings.includes(followingUserId)

  const text = isFollowing ? 'Unfollow' : 'Follow'
  const mutation = isFollowing ? useUnfollowing : useFollowing

  const { mutate, isPending } = mutation(followingUserId)

  return (
    <Button
      isLoading={isPending}
      isDisabled={isPending}
      onClick={() => mutate()}
    >
      {text}
    </Button>
  )
}
