import { Button, Flex, Show, Stack, Text } from '@chakra-ui/react'
import UserAvatarLoader from '../../common/user-avatar-loader/user-avatar-loader.component'
import { Suspense } from 'react'
import SuggestedUsers from '../suggested-users/suggested-user.component'
import { useIntiniteSuggestedUsers } from '../../../hooks/queries/infinite/useInfiniteSuggestedUsers'

export default function SuggestedForYou() {
  const { hasNextPage, fetchNextPage } = useIntiniteSuggestedUsers({
    suspense: false,
  })

  return (
    <Show above='lg'>
      <Flex>
        <Flex
          width={'full'}
          direction={'column'}
          height={'fit-content'}
          position={'sticky'}
          top={'5%'}
          gap={5}
          w={'300px'}
        >
          <Flex justifyContent={'space-between'} alignItems={'center'}>
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

          <Suspense
            fallback={
              <Stack spacing={4}>
                <UserAvatarLoader length={3} />
              </Stack>
            }
          >
            <SuggestedUsers />
          </Suspense>
        </Flex>
      </Flex>
    </Show>
  )
}
