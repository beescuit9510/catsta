import { Flex, Icon } from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
import { IoChatbubbleOutline } from 'react-icons/io5'

export default function Like({ liked }: { liked: boolean }) {
  return (
    <>
      <Flex gap={3}>
        <Icon
          as={FaHeart}
          fontSize={25}
          color={liked ? 'red' : 'gray.600'}
          cursor={'pointer'}
          _hover={{
            color: liked ? 'gray' : 'red',
          }}
          size={25}
        />
        <Icon as={IoChatbubbleOutline} cursor={'pointer'} fontSize={25} />
      </Flex>
    </>
  )
}
