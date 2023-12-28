import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react'
import ProfileGrid from '../../components/profile-grid/profile-grid.component'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../../utils/firebase'
import { useQuery } from '@tanstack/react-query'

export default function ProfileDetail({ userId }: { userId: string }) {
  // FIXME: FIX profile is possibly undefined error without .! operator
  // TODO: abstract react query code from component

  const { data: profile } = useQuery({
    queryKey: ['users', userId],
    queryFn: () =>
      getDoc(doc(firestore, 'users', userId)).then((snap) => {
        if (snap.exists()) return snap.data()
        else throw new Error('User not found')
      }),
  })

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
                    <Text>{profile!.displayName}</Text>
                    <Button>Edit Profile</Button>
                  </Flex>
                  <Flex gap={5}>
                    <Text>
                      <Text as={'span'} fontWeight={'900'}>
                        {profile!.posts}
                      </Text>{' '}
                      Posts
                    </Text>
                    <Text>
                      <Text as={'span'} fontWeight={'900'}>
                        {profile!.followers.length}
                      </Text>{' '}
                      Followers
                    </Text>
                    <Text>
                      <Text as={'span'} fontWeight={'900'}>
                        {profile!.followings.length}
                      </Text>{' '}
                      Following
                    </Text>
                  </Flex>
                  <Text>{profile!.bio}</Text>
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
