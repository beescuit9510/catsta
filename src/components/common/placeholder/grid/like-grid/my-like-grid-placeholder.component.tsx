import GoLink from '../../../go-link/go-link.component'
import Placeholder from '../placeholder.component'
import { Text } from '@chakra-ui/react'

export default function MyLikeGridPlaceholder() {
  return (
    <Placeholder>
      <Text variant='placeholder'>Like a post and share with the world!</Text>
      <GoLink to='/'>like your friends' post!</GoLink>
    </Placeholder>
  )
}
