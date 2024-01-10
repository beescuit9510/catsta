import PostLogo from '../../common/post-logo'
import Placeholder from '../placeholder.component'
import { Text } from '@chakra-ui/react'

export default function PostGridPlaceholder() {
  return (
    <Placeholder>
      <PostLogo />
      <Text variant='placeholder'>No Posts Yet</Text>
    </Placeholder>
  )
}
