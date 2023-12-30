import { Avatar, Center, Container, Flex, Stack, Text } from '@chakra-ui/react'
import { useCachedUser } from '../../hooks/queries/useUser'
import { auth } from '../../utils/firebase'
import ProfileEdit from '../../components/profile/profile-edit/profile-edit.component'
import ProfileTabs from '../../components/profile/profile-tab/profile-tabs.component'
import ProfileInfo from '../../components/profile/profile-info/profile-info.component'

export default function Me() {
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
              {/* FIXME: image dose not appear right away after skeleton. */}
              <Avatar
                size={{ base: 'xl', md: '2xl' }}
                src={currentUser!.photoURL}
              />
              <Flex>
                <Stack>
                  <Flex
                    alignItems={'center'}
                    direction={{ base: 'column', md: 'row' }}
                    gap={3}
                  >
                    <Text>{currentUser!.displayName}</Text>
                    <ProfileEdit userId={currentUser!.id} />
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
