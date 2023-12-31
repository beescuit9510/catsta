import { Stack } from '@chakra-ui/react'
import { useSearchUser } from '../../../hooks/queries/useSearchUser'
import UserAvatar from '../../common/user-avatar/user-avatar.component'

export default function SearchedUserList({ keyword }: { keyword: string }) {
  const { data: users } = useSearchUser(keyword)

  return (
    <Stack spacing={3}>
      {users?.map((user) => (
        <UserAvatar
          displayName={user.displayName}
          userId={user.id}
          photoURL={user.photoURL}
        />
      ))}
    </Stack>
  )
}
