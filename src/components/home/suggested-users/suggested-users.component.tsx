import { Button, Flex, Text } from '@chakra-ui/react'
import UserAvatar from '../../common/user-avatar/user-avatar.component'
import UserAvatarLoader from '../../common/user-avatar-loader/user-avatar-loader.component'
import { useIntiniteSuggestedUsers } from '../../../hooks/queries/infinite/useInfiniteSuggestedUsers'

export default function SuggestedUsers() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useIntiniteSuggestedUsers()
  return (
    <Flex display={{ base: 'none', lg: 'block' }}>
      <Flex
        width={'full'}
        direction={'column'}
        height={'fit-content'}
        position={'sticky'}
        top={'5%'}
        gap={5}
      >
        <Flex
          w={'300px'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Text fontWeight={'600'}>Suggested for you</Text>
          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              size={'sm'}
              variant={'ghost'}
            >
              See More
            </Button>
          )}
        </Flex>
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
        {isFetchingNextPage && (
          <UserAvatarLoader length={data!.pages.at(0)!.perPage} />
        )}
      </Flex>
    </Flex>
  )
}
