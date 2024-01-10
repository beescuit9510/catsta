import Placeholder from '../placeholder.component'
import PostLogo from '../../common/post-logo'
import { Text } from '@chakra-ui/react'
import GoLink from '../../../go-link/go-link.component'

export default function MyPostGridPlaceholder() {
  return (
    <Placeholder>
      <PostLogo />
      <Text variant='placeholder'>Share a moment with the world!</Text>
      <GoLink to='/create'>create your first post!</GoLink>
    </Placeholder>
  )
}
