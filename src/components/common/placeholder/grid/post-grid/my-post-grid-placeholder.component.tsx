import Placeholder from '../placeholder.component'
import PostLogo from '../../common/post-logo'
import PlaceholderText from '../../common/placeholder-text'
import PlaceholderLink from '../../common/placeholder-link'

export default function MyPostGridPlaceholder() {
  return (
    <Placeholder>
      <PostLogo />
      <PlaceholderText>Share a moment with the world!</PlaceholderText>
      <PlaceholderLink to='/create'>create your first post!</PlaceholderLink>
    </Placeholder>
  )
}
