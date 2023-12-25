import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Post({
  postRef,
  imageURL,
  photoURL,
  displayName,
  caption,
  likes,
  liked,
}: {
  postRef: string
  imageURL: string
  photoURL: string
  displayName: string
  caption: string
  likes: number
  liked: boolean
}) {
  return (
    <Container>
      <Stack>
        <Box>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex
              justifyContent={'space-between'}
              alignItems={'center'}
              gap={2}
            >
              <Link to={`/profile/${postRef}`}>
                <Avatar src={photoURL} />
              </Link>
              <Link to={`/profile/${postRef}`}>
                <Text>{displayName}</Text>
              </Link>
            </Flex>

            <Button size={'sm'} variant='ghost'>
              Unfollow
            </Button>
          </Flex>
        </Box>
        <Box>
          <Image src={imageURL} />
        </Box>
        <Box>
          <Flex gap={3}>
            <Icon
              as={FaHeart}
              fontSize={25}
              color={liked ? 'red' : 'gray.600'}
              _hover={{ color: liked ? 'gray' : 'red', cursor: 'pointer' }}
              size={25}
            />
            <Icon
              as={IoChatbubbleOutline}
              _hover={{ cursor: 'pointer' }}
              fontSize={25}
            />
          </Flex>
        </Box>
        <Stack>
          <Text>{likes} likes</Text>
          <Flex gap={2}>
            <Text fontWeight={'700'}>{displayName}</Text>
            <Text>{caption}</Text>
          </Flex>

          <Box
            color={'gray.500'}
            _hover={{
              cursor: 'pointer',
              color: 'gray.600',
              textDecoration: 'underline',
            }}
          >
            View post
          </Box>
          <InputGroup variant={'flushed'}>
            <Input placeholder='Add a comment...' />
            <InputRightElement
              color={'blue.500'}
              _hover={{ cursor: 'pointer', color: 'blue.200' }}
            >
              Post
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Stack>
    </Container>
  )
}
