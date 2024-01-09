import { Stack } from '@chakra-ui/react'
import UserAvatar from '../../common/user-avatar/user-avatar.component'
import UserAvatarLoader from '../../common/user-avatar-loader/user-avatar-loader.component'
import { useIntiniteSuggestedUsers } from '../../../hooks/queries/infinite/useInfiniteSuggestedUsers'
import { useEffect } from 'react'

export default function SuggestedUsers({
  setHasNextPage,
  fetchNext,
}: {
  setHasNextPage: (hasNextPage: boolean) => void
  fetchNext: boolean
}) {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useIntiniteSuggestedUsers()

  useEffect(() => {
    setHasNextPage(hasNextPage)
  }, [hasNextPage])

  useEffect(() => {
    if (fetchNext) fetchNextPage()
  }, [fetchNext])

  return (
    <>
      <Stack spacing={4} maxHeight={'500px'} overflowY={'auto'}>
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
      </Stack>
      {isFetchingNextPage && (
        <UserAvatarLoader length={data!.pages.at(0)!.perPage} />
      )}
    </>
  )
}
