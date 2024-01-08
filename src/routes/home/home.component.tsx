import Feed from '../../components/home/feed/feed.component'
import { Container, Flex, Stack } from '@chakra-ui/react'
import SuggestedUsers from '../../components/home/suggested-users/suggested-users.component'
import { Suspense } from 'react'
import PostLoader from '../../components/common/loader/post-loader.component'
import UserAvatarLoader from '../../components/common/user-avatar-loader/user-avatar-loader.component'

export default function Home() {
  return (
    <Container maxW='container.lg' marginTop={'5%'} marginY={20}>
      <Flex gap={10}>
        <Container>
          <Suspense fallback={<PostLoader length={3} />}>
            <Feed />
          </Suspense>
        </Container>
        <Suspense
          fallback={
            <Flex display={{ base: 'none', lg: 'block' }}>
              <Flex width={'full'} direction={'column'} top={'5%'} gap={5}>
                <Stack>
                  <UserAvatarLoader length={1} />
                </Stack>
              </Flex>
            </Flex>
          }
        >
          <SuggestedUsers />
        </Suspense>
      </Flex>
    </Container>
  )
}
