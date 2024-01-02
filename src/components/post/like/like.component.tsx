import { Flex, Icon } from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
// import { IoChatbubbleOutline } from 'react-icons/io5'
import useLike from '../../../hooks/mutations/useLike'
import useUnlike from '../../../hooks/mutations/useUnlike'
import useShowToast from '../../../hooks/useShowToast'

export default function Like({
  liked,
  userId,
  postId,
}: {
  liked: boolean
  userId: string
  postId: string
}) {
  const toast = useShowToast()

  const onLikeSuccess = () => toast('success', 'Successfully liked.')
  const onUnlikeSuccess = () => toast('success', 'Successfully unliked.')
  const onError = () => toast('error', 'Sorry, unexpected error has occured.')

  const { mutate: like } = useLike({
    userId,
    postId,
    onSuccess: onLikeSuccess,
    onError,
  })

  const { mutate: unlike } = useUnlike({
    userId,
    postId,
    onSuccess: onUnlikeSuccess,
    onError,
  })

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
          onClick={() => (liked ? unlike() : like())}
          size={25}
        />
      </Flex>
    </>
  )
}
