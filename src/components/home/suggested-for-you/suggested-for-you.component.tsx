import { Button, Flex, Show, Stack, Text } from '@chakra-ui/react'
import UserAvatarLoader from '../../common/user-avatar-loader/user-avatar-loader.component'
import { Suspense, useState } from 'react'
import SuggestedUsers from '../suggested-users/suggested-user.component'

export default function SuggestedForYou() {
  const [hasNextPage, setHasNextPage] = useState(true)
  const [fetchNext, setFetchNext] = useState(false)

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
        >
          <Flex
            w={'300px'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text fontWeight={'600'}>Suggested for you</Text>
            {hasNextPage && (
              <Button
                onClick={() => setFetchNext(true)}
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
            <SuggestedUsers
              setHasNextPage={setHasNextPage}
              fetchNext={fetchNext}
            />
          </Suspense>
        </Flex>
      </Flex>
    </Show>
  )
}
