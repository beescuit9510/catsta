import { Button, Stack } from '@chakra-ui/react'
import { useIntiniteSearchUser } from '../../../hooks/queries/useSearchUser'
import UserAvatar from '../../common/user-avatar/user-avatar.component'

export default function SearchedUserList({ keyword }: { keyword: string }) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useIntiniteSearchUser(keyword)

  return (
    <Stack spacing={3}>
      {data?.pages
        .flatMap((page) => page.users)
        .map((user) => (
          <UserAvatar
            key={user.id}
            displayName={user.displayName}
            userId={user.id}
            photoURL={user.photoURL}
          />
        ))}
      {hasNextPage && (
        <Button
          disabled={isFetchingNextPage}
          isLoading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Load more
        </Button>
      )}
    </Stack>
  )
}
