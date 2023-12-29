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
import { doc, getDoc } from 'firebase/firestore'
import { auth, firestore } from '../../utils/firebase'
import { useQuery } from '@tanstack/react-query'
import Follow from '../../components/follow/follow'
import { queryClient } from '../../main'

// TODO: abstract react query code from component
// TODO find firebase + typescript example
// TODO: extract type.

export default function UserProfile({ userId }: { userId?: string }) {
  const currentUser = queryClient.getQueryData<{
    id: string
    displayName: string
    photoURL: string
    bio: string
    posts: number
    followers: string[]
    followings: string[]
    createdAt: string
  }>(['users', auth.currentUser!.uid])

  const { data: user } = useQuery({
    queryKey: ['users', userId],
    queryFn: ({ queryKey }) =>
      getDoc(doc(firestore, 'users', queryKey[1]!)).then((snap) => snap.data()),
    select: (data) => {
      if (!data) throw new Error('User not found')
      return { ...data }
    },
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
                    <Text>{user?.displayName}</Text>
                    <Follow
                      userId={currentUser!.id}
                      followingUserId={user?.id}
                      following={currentUser!.followings.includes(user?.id)}
                    />
                  </Flex>
                  <Flex gap={5}>
                    <Text>
                      <Text as={'span'} fontWeight={'900'}>
                        {user?.posts}
                      </Text>{' '}
                      Posts
                    </Text>
                    <Text>
                      <Text as={'span'} fontWeight={'900'}>
                        {user?.followers.length}
                      </Text>{' '}
                      Followers
                    </Text>
                    <Text>
                      <Text as={'span'} fontWeight={'900'}>
                        {user?.followings.length}
                      </Text>{' '}
                      Following
                    </Text>
                  </Flex>
                  <Text>{user?.bio}</Text>
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
