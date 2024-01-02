import { Box, Flex, GridItem, Icon, Image, Text } from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
import { IoChatbubble } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export default function ProfileGridItem({
  postId,
  imageURL,
  likes,
  comments,
}: {
  postId: string
  imageURL: string
  likes: number
  comments: number
}) {
  return (
    <GridItem cursor={'pointer'} position={'relative'} role='group'>
      <Link to={`/posts/${postId}`}>
        <Image src={imageURL} objectFit='cover' boxSize='full' />

        <Box
          position={'absolute'}
          bg={'black'}
          top={0}
          left={0}
          bottom={0}
          right={0}
          opacity={0}
          _groupHover={{ bg: 'black', opacity: 0.2 }}
          transition={'all 150ms ease'}
        />
        <Flex
          position={'absolute'}
          top={0}
          left={0}
          bottom={0}
          right={0}
          color={'white'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={{ base: 2, md: 5 }}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          transition={'all 150ms ease'}
        >
          <Flex alignItems={'center'} gap={{ base: 1, md: 2 }}>
            <Icon as={FaHeart} fontSize={{ base: '0.8em', md: '1.5em' }} />
            <Text fontSize={{ base: '0.8em', md: '1.5em' }} fontWeight={'700'}>
              {likes}
            </Text>
          </Flex>
          <Flex alignItems={'center'} gap={{ base: 1, md: 2 }}>
            <Icon as={IoChatbubble} fontSize={{ base: '0.8em', md: '1.5em' }} />
            <Text fontSize={{ base: '0.8em', md: '1.5em' }} fontWeight={'700'}>
              {comments}
            </Text>
          </Flex>
        </Flex>
      </Link>
    </GridItem>
  )
}
