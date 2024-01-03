import { Flex, Icon, Text } from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
import { IoChatbubble } from 'react-icons/io5'
import GridItemHover from '../grid-item-hover/grid-item-hover.component'

export default function PostGridItem({
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
    <GridItemHover to={`/posts/${postId}`} src={imageURL}>
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
    </GridItemHover>
  )
}
