import { Button } from '@chakra-ui/react'
import useFollowing from '../../../hooks/mutations/useFollowing'

export default function FollowingBtn({
  userId,
  followingUserId,
}: {
  userId: string
  followingUserId: string
}) {
  const { mutate, isPending } = useFollowing({ userId, followingUserId })

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
