import { Avatar, Center, Container, Flex, Stack, Text } from '@chakra-ui/react'
import { auth } from '../../utils/firebase'
import { useCachedUser, useUser } from '../../hooks/queries/useUser'
import ProfileTabs from '../../components/profile/profile-tab/profile-tabs.component'
import ProfileInfo from '../../components/profile/profile-info/profile-info.component'
import FollowingBtn from '../../components/common/following-btn/following-btn.component'
import UnfollowingBtn from '../../components/common/unfollowing-btn/unfollowing-btn.component'

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
              <Avatar src={user!.photoURL} size={{ base: 'xl', md: '2xl' }} />
              <Flex>
                <Stack>
                  <Flex
                    alignItems={'center'}
                    direction={{ base: 'column', md: 'row' }}
                    gap={3}
                  >
                    <Text>{user!.displayName}</Text>
                    {currentUser!.followings.includes(user!.id) ? (
                      <UnfollowingBtn
                        userId={currentUser!.id}
                        followingUserId={user!.id}
                      />
                    ) : (
                      <FollowingBtn
                        userId={currentUser!.id}
                        followingUserId={user!.id}
                      />
                    )}
                  </Flex>
                  <ProfileInfo
                    posts={user!.posts}
                    followers={user!.followers.length}
                    followings={user!.followings.length}
                    bio={user!.bio}
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
