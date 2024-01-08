import { Button, Stack } from '@chakra-ui/react'
import UserAvatar from '../../common/user-avatar/user-avatar.component'
import UserAvatarLoader from '../../common/user-avatar-loader/user-avatar-loader.component'
import { useInfiniteSearchUsers } from '../../../hooks/queries/infinite/useInfiniteSearchUsers'

export default function SearchedUserList({ keyword }: { keyword: string }) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteSearchUsers(keyword)

  return (
    <Stack spacing={3}>
      {data?.pages
        .flatMap((page) => page.data)
        .map((user) => (
          <UserAvatar
            key={user.id}
            displayName={user.displayName}
            userId={user.id}
            photoURL={user.photoURL}
            bio={user.bio}
          />
        ))}
      {hasNextPage && !isFetchingNextPage && (
        <Button onClick={() => fetchNextPage()}>Load more</Button>
      )}
      {/* TODO: extract code */}
      {isFetchingNextPage && (
        <UserAvatarLoader length={data!.pages.at(0)!.perPage} />
      )}
    </Stack>
  )
}
