import { Button } from '@chakra-ui/react'
import useUnfollowing from '../../../hooks/mutations/useUnfollowing'

export default function UnfollowingBtn({
  userId,
  followingUserId,
}: {
  userId: string
  followingUserId: string
}) {
  const { mutate, isPending } = useUnfollowing({ userId, followingUserId })

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
