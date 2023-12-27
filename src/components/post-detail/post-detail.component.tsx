import {
  Avatar,
  Box,
  Button,
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
import Comment from '../comment/comment.component'

export type PostProps = {
  postRef: string
  imageURL: string
  photoURL: string
  displayName: string
  caption: string
  likes: number
  liked: boolean
}

export default function PostDetail({
  postRef,
  imageURL,
  photoURL,
  displayName,
  caption,
  likes,
  liked,
}: PostProps) {
  return (
    <>
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
              cursor={'pointer'}
              _hover={{ color: liked ? 'gray' : 'red' }}
              size={25}
            />
            <Icon as={IoChatbubbleOutline} cursor={'pointer'} fontSize={25} />
          </Flex>
        </Box>

        <Stack>
          <Text>{likes} likes</Text>
          <Flex gap={2}>
            <Text fontWeight={'700'}>{displayName}</Text>
            <Text>{caption}</Text>
          </Flex>

          <InputGroup variant={'flushed'}>
            <Input placeholder='Add a comment...' />
            <InputRightElement>
              <Button
                variant={'ghost'}
                cursor={'link'}
                color={'blue.500'}
                _hover={{ color: 'blue.700' }}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>

          <Stack spacing={5}>
            <Comment
              displayName='Byunduck'
              content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis odit ex adipisci ipsum reprehenderit sed id cum
                  voluptatibus nulla nemo.'
              createdAt='8d ago'
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
