import { Avatar, Center, Container, Flex, Stack, Text } from '@chakra-ui/react'
import { auth } from '../../utils/firebase'
import Follow from '../../components/common/follow/follow'
import { useCachedUser, useUser } from '../../hooks/queries/useUser'
import ProfileTabs from '../../components/profile/profile-tab/profile-tabs.component'
import ProfileInfo from '../../components/profile/profile-info/profile-info.component'

export default function UserProfile({ userId }: { userId?: string }) {
  const { data: user } = useUser(userId!)
  const currentUser = useCachedUser(auth.currentUser!.uid)

  return (
    <>
      <Center marginTop={20}>
        <Container maxW='container.lg'>
          <Stack spacing={10}>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              alignItems={'center'}
              gap={3}
            >
              <Avatar size={{ base: 'xl', md: '2xl' }} />
              <Flex>
                <Stack>
                  <Flex
                    alignItems={'center'}
                    direction={{ base: 'column', md: 'row' }}
                    gap={3}
                  >
                    <Text>{user!.displayName}</Text>
                    <Follow
                      userId={currentUser!.id}
                      followingUserId={user!.id}
                      following={currentUser!.followings.includes(user!.id)}
                    />
                  </Flex>
                  <ProfileInfo
                    posts={currentUser!.posts}
                    followers={currentUser!.followers.length}
                    followings={currentUser!.followings.length}
                    bio={currentUser!.bio}
                  />
                </Stack>
              </Flex>
            </Flex>

            <ProfileTabs />
          </Stack>
        </Container>
      </Center>
    </>
  )
}
