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

export default function Profile() {
  return (
    <div>
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
                    <Text>JARROD</Text>
                    <Button>Edit Profile</Button>
                  </Flex>
                  <Flex gap={5}>
                    <Text>
                      <Text as={'span'} fontWeight={'900'}>
                        1
                      </Text>{' '}
                      Posts
                    </Text>
                    <Text>
                      <Text as={'span'} fontWeight={'900'}>
                        1
                      </Text>{' '}
                      Followers
                    </Text>
                    <Text>
                      <Text as={'span'} fontWeight={'900'}>
                        1
                      </Text>{' '}
                      Following
                    </Text>
                  </Flex>
                  <Text>Hello, I am Jarrod!</Text>
                </Stack>
              </Flex>
            </Flex>

            <Flex>
              <Box
                w={'full'}
                textAlign={'center'}
                padding={2}
                borderTop={'1px solid'}
                // borderColor={'whiteAlpha.500'}
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
    </div>
  )
}
