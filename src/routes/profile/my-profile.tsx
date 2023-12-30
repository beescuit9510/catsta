import {
  Avatar,
  Box,
  Center,
  Container,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react'
import ProfileGrid from '../../components/profile-grid/profile-grid.component'
import EditProfile from './edit-profile'
import { useCachedUser } from '../../hooks/queries/useUser'
import { auth } from '../../utils/firebase'

export default function MyProfile() {
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
                    <EditProfile userId={currentUser!.id} />
                  </Flex>
                  <Flex gap={5}>
                    <Text>
                      <Text as={'span'} fontWeight={'900'}>
                        {currentUser!.posts}
                      </Text>{' '}
                      Posts
                    </Text>
                    <Text>
                      <Text as={'span'} fontWeight={'900'}>
                        {currentUser!.followers.length}
                      </Text>{' '}
                      Followers
                    </Text>
                    <Text>
                      <Text as={'span'} fontWeight={'900'}>
                        {currentUser!.followings.length}
                      </Text>{' '}
                      Following
                    </Text>
                  </Flex>
                  <Text>{currentUser!.bio}</Text>
                </Stack>
              </Flex>
            </Flex>

            <Flex>
              <Box
                w={'full'}
                textAlign={'center'}
                padding={2}
                borderTop={'1px solid'}
                _hover={{ borderTop: '1px solid' }}
              >
                POSTS
              </Box>
              <Box
                w={'full'}
                textAlign={'center'}
                padding={2}
                borderTop={'1px solid'}
                borderColor={'whiteAlpha.500'}
                _hover={{ borderTop: '1px solid' }}
              >
                LIKES
              </Box>
            </Flex>

            <ProfileGrid />
          </Stack>
        </Container>
      </Center>
    </>
  )
}
